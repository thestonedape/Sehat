from fastapi import FastAPI, File, UploadFile, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from fastapi.responses import JSONResponse
import cv2
import numpy as np
import torch
from torchvision import transforms
from PIL import Image
import pytesseract
import os
from models.skin_model import SkinDiseaseModel
from utils.preprocess import preprocess_image
from utils.ocr import extract_text

app = FastAPI()

# CORS for frontend communication
app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:5173", "http://localhost:80"],  # Update with production URL later
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Create static directory if it doesn't exist
os.makedirs("static/uploads", exist_ok=True)

# Load PyTorch model (update path to your trained model)
model = SkinDiseaseModel()
try:
    model.load_state_dict(torch.load("path/to/your/model.pth", map_location=torch.device('cpu')))
except FileNotFoundError:
    print("Model file not found. Please provide a trained model.")
model.eval()

# Image transformations
transform = transforms.Compose([
    transforms.Resize((224, 224)),
    transforms.ToTensor(),
    transforms.Normalize(mean=[0.485, 0.456, 0.406], std=[0.229, 0.224, 0.225])
])

# Skin disease classes (update with your dataset's classes)
CLASSES = ["Melanoma", "Eczema", "Psoriasis", "Normal"]

@app.post("/upload-image/")
async def upload_image(file: UploadFile = File(...)):
    try:
        # Save uploaded image
        file_path = f"static/uploads/{file.filename}"
        with open(file_path, "wb") as buffer:
            buffer.write(await file.read())

        # Preprocess image
        img = cv2.imread(file_path)
        if img is None:
            raise HTTPException(status_code=400, detail="Invalid image file")
        img = preprocess_image(img)
        img_pil = Image.fromarray(cv2.cvtColor(img, cv2.COLOR_BGR2RGB))

        # Run model inference
        img_tensor = transform(img_pil).unsqueeze(0)
        with torch.no_grad():
            outputs = model(img_tensor)
            _, predicted = torch.max(outputs, 1)
            prediction = CLASSES[predicted.item()]

        # Extract text with Pytesseract
        text = extract_text(file_path)

        return JSONResponse({
            "prediction": prediction,
            "confidence": float(outputs.softmax(1)[0][predicted].item()),
            "extracted_text": text
        })
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))

@app.get("/health")
async def health_check():
    return {"status": "Backend is running"}