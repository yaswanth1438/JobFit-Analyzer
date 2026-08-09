import docx
import PyPDF2

def extract_text_docx(file_path):
    """Extract text from a DOCX resume."""
    doc = docx.Document(file_path)
    return " ".join([para.text for para in doc.paragraphs])

def extract_text_pdf(file_path):
    """Extract text from a PDF resume."""
    text = ""
    reader = PyPDF2.PdfReader(file_path)
    for page in reader.pages:
        text += page.extract_text()
    return text
