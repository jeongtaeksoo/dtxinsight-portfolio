import pdfplumber

pdf_path = "이력서_정택수(올라운드닥터스).pdf"

try:
    with pdfplumber.open(pdf_path) as pdf:
        full_text = ""
        for page in pdf.pages:
            full_text += page.extract_text() + "\n"
    
    print(full_text)
except Exception as e:
    print(f"Error extracting text: {e}")
