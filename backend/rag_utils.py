# backend/rag_utils.py

import os
import faiss
import numpy as np
from sentence_transformers import SentenceTransformer
import pickle

model = SentenceTransformer('all-MiniLM-L6-v2')

def load_documents(folder="legal_docs"):
    docs = []
    for filename in os.listdir(folder):
        if filename.endswith(".txt"):  # Only load .txt files
            with open(os.path.join(folder, filename), 'r', encoding='utf-8') as f:
                docs.append((filename, f.read()))
    return docs

def build_faiss_index(documents):
    texts = [doc[1] for doc in documents]
    embeddings = model.encode(texts, convert_to_numpy=True)

    index = faiss.IndexFlatL2(embeddings[0].shape[0])
    index.add(np.array(embeddings))

    with open("faiss_index.pkl", "wb") as f:
        pickle.dump((index, documents), f)

def search(query, k=3):
    with open("faiss_index.pkl", "rb") as f:
        index, documents = pickle.load(f)

    query_vec = model.encode([query], convert_to_numpy=True)
    D, I = index.search(query_vec, k)
    results = [documents[i][1] for i in I[0]]
    return results
