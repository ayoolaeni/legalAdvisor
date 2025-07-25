import pdfplumber
import os

PDF_FOLDER = "pdfs"
OUTPUT_FOLDER = "legal_docs"

def extract_text(pdf_path):
    text = ""
    with pdfplumber.open(pdf_path) as pdf:
        for i, page in enumerate(pdf.pages):
            page_text = page.extract_text()
            if page_text:
                text += page_text + "\n\n"
            else:
                print(f"⚠️ Page {i+1} in {os.path.basename(pdf_path)} may be empty.")
    return text

os.makedirs(OUTPUT_FOLDER, exist_ok=True)

pdf_files = [f for f in os.listdir(PDF_FOLDER) if f.endswith(".pdf")]
if not pdf_files:
    print("❌ No PDF files found in 'pdfs/' folder.")
else:
    for pdf_file in pdf_files:
        input_path = os.path.join(PDF_FOLDER, pdf_file)
        output_filename = os.path.splitext(pdf_file)[0].lower().replace(" ", "_") + ".txt"
        output_path = os.path.join(OUTPUT_FOLDER, output_filename)

        print(f"📄 Extracting: {pdf_file} → {output_filename}")
        text = extract_text(input_path)

        with open(output_path, "w", encoding="utf-8") as f:
            f.write(text)

    print("✅ All PDFs processed. Text saved to 'legal_docs/'")
