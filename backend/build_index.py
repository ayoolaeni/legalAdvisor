# backend/build_index.py
from rag_utils import load_documents, build_faiss_index

docs = load_documents("legal_docs")
build_faiss_index(docs)
print("FAISS index built and saved.")
