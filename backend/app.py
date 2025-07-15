# backend/app.py

from flask import Flask, request, jsonify
from flask_cors import CORS
import requests
from flask_pymongo import PyMongo
from flask_bcrypt import Bcrypt
from flask_login import LoginManager, UserMixin, login_user, logout_user, login_required, current_user
from bson.objectid import ObjectId
from datetime import datetime
from rag_utils import search
from dotenv import load_dotenv
load_dotenv()

import os

app = Flask(__name__)
CORS(app, supports_credentials=True, origins=["http://localhost:5173"])


# MongoDB Config
app.config["MONGO_URI"] =  os.getenv("MONGO_URI") # Or use your Atlas URI
app.config['SECRET_KEY'] = os.getenv("SECRET_KEY")

mongo = PyMongo(app)
bcrypt = Bcrypt(app)
login_manager = LoginManager(app)
login_manager.init_app(app)

# Custom User Class
class User(UserMixin):
    def __init__(self, user_data):
        self.id = str(user_data["_id"])
        self.email = user_data["email"]

@login_manager.user_loader
def load_user(user_id):
    user_data = mongo.db.users.find_one({"_id": ObjectId(user_id)})
    return User(user_data) if user_data else None

# app = Flask(__name__)
# CORS(app)



# Set your OpenRouter API key securely
OPENROUTER_API_KEY = os.getenv("OPENROUTER_API_KEY")

# Choose your preferred model
MODEL = "meta-llama/llama-3-8b-instruct"

########################################################################################


@app.route('/register', methods=['POST', 'OPTIONS'])
def register():
    if request.method == 'OPTIONS':
        return '', 200  # Preflight CORS response

    data = request.get_json()

    email = data.get('email')
    password = data.get('password')
    name = data.get('name')

    if not email or not password or not name:
        return jsonify({'error': 'Missing required fields'}), 400

    existing_user = mongo.db.users.find_one({'email': email})
    if existing_user:
        return jsonify({'error': 'User already exists'}), 409

    hashed_password = bcrypt.generate_password_hash(password).decode('utf-8')

    new_user = {
        'email': email,
        'password': hashed_password,
        'name': name,
        'subscription': 'free',
        'created_at': datetime.utcnow()
    }

    mongo.db.users.insert_one(new_user)

    return jsonify({'message': 'User registered successfully'}), 201



############################################################################

@app.route("/login", methods=["POST"])
def login():
    data = request.json
    email = data.get("email")
    password = data.get("password")

    user = mongo.db.users.find_one({"email": email})
    if user and bcrypt.check_password_hash(user["password"], password):
        login_user(User(user))
        return jsonify({"message": "Login successful", "user_id": str(user["_id"])})
    return jsonify({"error": "Invalid credentials"}), 401


@app.route("/logout", methods=["POST"])
def logout():
    if current_user.is_authenticated:
        logout_user()
    return jsonify({"message": "Logged out"})


##########################################################################


@app.route("/api/chat", methods=["POST"])
@login_required
def chat():
    user_input = request.json.get("message")

    # 1. Retrieve relevant legal content from FAISS
    retrieved_docs = search(user_input)
    context = "\n\n".join(retrieved_docs)

    # 2. Include retrieved context in prompt
    headers = {
        "Authorization": f"Bearer {OPENROUTER_API_KEY}",
        "Content-Type": "application/json",
        "HTTP-Referer": "http://localhost:5173", 
        "X-Title": "legaadvisor"
    }

    data = {
        "model": MODEL,
        "messages": [
            {"role": "system", "content": "You are a helpful legal assistant. Provide non-binding legal guidance based on Nigerian law."},
            {"role": "user", "content": f"Relevant law:\n{context}\n\nUser's question: {user_input}"}
        ]
    }

    try:
        response = requests.post("https://openrouter.ai/api/v1/chat/completions", headers=headers, json=data)
        result = response.json()
        reply = result["choices"][0]["message"]["content"]

        # 3. Save chat to MongoDB
        mongo.db.chats.insert_one({
            "user_id": ObjectId(current_user.id),
            "message": user_input,
            "response": reply,
            "timestamp": datetime.utcnow()
        })

        return jsonify({"response": reply})
    except Exception as e:
        return jsonify({"error": str(e)}), 500

    
##########################################################################

@app.route("/api/history", methods=["GET"])
@login_required
def get_chat_history():
    chats = mongo.db.chats.find({"user_id": ObjectId(current_user.id)}).sort("timestamp", -1)
    history = [
        {
            "_id": str(chat["_id"]),
            "message": chat["message"],
            "response": chat["response"],
            "timestamp": chat["timestamp"].isoformat()
        }
        for chat in chats
    ]
    return jsonify(history)



@app.route("/api/history/<chat_id>", methods=["DELETE"])
@login_required
def delete_chat(chat_id):
    try:
        result = mongo.db.chats.delete_one({
            "_id": ObjectId(chat_id),
            "user_id": ObjectId(current_user.id)
        })

        if result.deleted_count == 1:
            return jsonify({"message": "Chat deleted"}), 200
        else:
            return jsonify({"error": "Chat not found"}), 404
    except Exception as e:
        return jsonify({"error": str(e)}), 500

##########################################################################

@app.route('/api/profile', methods=['GET'])
@login_required
def get_profile():
    user = mongo.db.users.find_one({'_id': ObjectId(current_user.id)})

    if not user:
        return jsonify({'error': 'User not found'}), 404

    # Count the number of chats by this user
    chat_count = mongo.db.chats.count_documents({'user_id': ObjectId(current_user.id)})

    return jsonify({
        "id": str(user['_id']),
        "name": user.get('name', 'Anonymous User'),  # fallback if name is missing
        "email": user.get('email', 'No email'),
        "joinDate": str(user.get('created_at', '')),  # only if you have 'created_at'
        "subscription": user.get('subscription', 'free'),
        "totalChats": chat_count
    })



##########################################################################


if __name__ == "__main__":
    app.run(debug=True)
