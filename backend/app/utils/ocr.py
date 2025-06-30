import pytesseract
from PIL import Image

def extract_text(image_path):
    try:
        img = Image.open(image_path)
        text = pytesseract.image_to_string(img)
        return text if text.strip() else "No text detected"
    except Exception as e:
        return f"OCR error: {str(e)}"