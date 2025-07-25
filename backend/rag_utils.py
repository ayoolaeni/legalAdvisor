import os
import faiss
import numpy as np
from sentence_transformers import SentenceTransformer
import pickle
import re

model = SentenceTransformer('all-MiniLM-L6-v2')

########################################################################################

def load_documents(folder="legal_docs"):
    docs = []
    for filename in os.listdir(folder):
        if filename.endswith(".txt"):
            with open(os.path.join(folder, filename), 'r', encoding='utf-8') as f:
                docs.append((filename, f.read()))
    return docs


################################################################################



def chunk_text(text, max_length=500):
    paragraphs = text.split("\n")
    chunks, current_chunk = [], ""
    current_title = "General"

    for para in paragraphs:
        para = para.strip()
        if re.match(r"^(Section|CHAPTER|PART|ARTICLE|SCHEDULE)\s?[A-Z0-9\-]*", para, re.IGNORECASE):
            current_title = para

        if len(current_chunk) + len(para) < max_length:
            current_chunk += para + "\n"
        else:
            chunks.append({"title": current_title, "text": current_chunk.strip()})
            current_chunk = para + "\n"

    if current_chunk:
        chunks.append({"title": current_title, "text": current_chunk.strip()})

    return chunks


###############################################################################

def build_faiss_index(documents):
    chunked_docs = []
    all_texts = []

    for filename, full_text in documents:
        chunks = chunk_text(full_text)
        for i, chunk in enumerate(chunks):
            chunked_docs.append({
                "filename": filename,
                "title": chunk["title"],   # From `chunk_text()` metadata
                "text": chunk["text"]
            })
            all_texts.append(chunk["text"])

    embeddings = model.encode(all_texts, convert_to_numpy=True)
    index = faiss.IndexFlatL2(embeddings[0].shape[0])
    index.add(np.array(embeddings))

    with open("faiss_index.pkl", "wb") as f:
        pickle.dump((index, chunked_docs), f)

    print("✅ FAISS index built and saved with metadata.")



#################################################################################
def search(query, k=3):
    with open("faiss_index.pkl", "rb") as f:
        index, documents = pickle.load(f)

    query_vec = model.encode([query], convert_to_numpy=True)
    D, I = index.search(query_vec, k)
    return [documents[i] for i in I[0]]
