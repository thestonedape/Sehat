

# 🏥 Skin Disease Classification System

Hey, welcome to the **Skin Disease Classification System**! This is a slick AI-powered web app that takes a crack at identifying skin conditions from images using some fancy deep learning tricks. We’re talking VGG16 magic here, fine-tuned to spot skin issues like a pro. It’s built to be helpful, but just a heads-up—it’s not your doctor! 😉

---

## 🎯 What’s the Big Idea?

Picture this: you snap a photo of a weird rash, upload it, and bam—this system gives you a guess about what’s up. Here’s what it brings to the table:

- **AI Smarts**: A beefy VGG16 model trained to recognize skin diseases.
- **Fast Backend**: Powered by FastAPI for speedy responses.
- **Easy Frontend**: A simple web interface to upload pics and get answers.
- **Cloud Ready**: Hosted on Render, so it can handle the crowd.
- **Polished Up**: Everything’s prepped and formatted for real-world use.

It’s like a pocket skin detective—cool, right?

---

## 🧠 How the AI Does Its Thing

We’re using **VGG16**, a deep learning champ with 16 layers of brainpower. It’s pre-trained on millions of images (thanks, ImageNet!), so it’s already a whiz at spotting patterns. We just gave it a crash course in skin conditions.

### Why VGG16 Rocks
- **Pre-Trained Perks**: It’s seen it all, so we didn’t start from zero.
- **Deep Dive**: Those 16 layers catch everything from edges to funky textures.
- **Skin-Friendly**: Perfect for picking out medical patterns.

### How We Trained It
We didn’t just toss it some pics and call it a day. Here’s the rundown:

1. **Feature Extraction**: Froze the base layers and let it learn the basics of skin diseases.
2. **Progressive Unfreezing**: Thawed out the last 4 layers, tweaked them gently with a tiny learning rate (1e-5).
3. **Deep Fine-Tuning**: Unlocked 8 layers, added some smart scheduling, and polished it up.

Think of it like tuning a guitar—start broad, then fine-tune the strings. 🎸

### Techy Bits
- **Input**: Images resized to 224x224 pixels.
- **Optimizer**: Adam, with a flexible learning rate.
- **Loss**: Categorical crossentropy (fancy way of saying it learns from mistakes).
- **Extras**: Early stopping, checkpoints, and augmentation (flips, zooms) to keep it sharp.

---

## 🔧 The Nuts and Bolts

### Backend (FastAPI)
FastAPI is our go-to because it’s, well, fast—and super easy to work with. Here’s what it handles:

- **Image Uploads**: Send a pic, it gets processed.
- **Prediction**: The model takes a look and spits out a guess.
- **Responses**: Clean, structured results with confidence scores.

#### Key Endpoints
- **POST `/predict`**: Upload an image, get a prediction.
- **GET `/health`**: Make sure everything’s humming along.
- **GET `/`**: Peek at what the API can do.

#### Image Prep
We resize images to 224x224, turn them into numbers, and tweak them for VGG16. It’s like prepping a canvas before painting. 🎨

### Dataset
We grabbed a solid set of skin disease images from Kaggle—balanced, verified, and ready to roll. We even tidied up the folder names to keep things clean.

### Saving the Model
The model’s stored in a `.keras` file, with class mappings in a pickle file. It’s all versioned and neat, so we can load it up anytime.

---

## 🚀 Going Live

We’ve parked this on **Render**, a cloud platform that scales like a champ. It’s got:

- **Auto-Scaling**: Handles traffic spikes no sweat.
- **Health Checks**: Keeps it alive and kicking.
- **Speed Boost**: Loads the model once and keeps it ready.

---

## 📊 How’s It Doing?

We’ve got some solid metrics to brag about:

- **Accuracy**: How often it nails the call.
- **Precision & Recall**: Balances catching the right stuff without guessing wild.
- **Confidence Scores**: Tells you how sure it is (like 89% sure it’s eczema).

It’s not perfect, but it’s pretty darn reliable!

---

## 🔬 Real-World Uses

This could be handy for:

- **Quick Looks**: A first guess before hitting the doc.
- **Telemedicine**: Helping out in far-off places.
- **Learning**: A neat tool for med students.

**Heads-Up**: It’s a helper, not a cure. Always double-check with a pro. 🩺

---

## 🛠️ Get It Running

### What You’ll Need
- Python 3.8+
- TensorFlow 2.x
- FastAPI, Uvicorn, Pillow, NumPy

### Backend Steps
```bash
# Grab the code
git clone <your-repo-url>
cd skin-disease-classification

# Set up a virtual env
python -m venv backenv
source backenv/bin/activate  # Linux/Mac
# or
backenv\Scripts\activate     # Windows

# Install the goods
pip install -r requirements.txt

# Drop in the model files
# Add final_model2.keras and class_index.pkl to the root

# Fire it up
uvicorn main:app --reload
```

### Frontend Steps
```bash
# Jump to frontend
cd frontend

# Install dependencies
npm install

# Point it to your backend
# Update baseURL in the code

# Launch it
npm start
```

---

## 📋 Using the API

### Check It’s Alive
```bash
curl -X GET "https://your-api-url.com/health"
```

### Try a Prediction
```bash
curl -X POST "https://your-api-url.com/predict" \
  -H "Content-Type: multipart/form-data" \
  -F "file=@skin-pic.jpg"
```

### What You’ll See
```json
{
  "predicted_class": "Eczema",
  "confidence": 0.89,
  "all_predictions": [
    {"class_name": "Eczema", "confidence": 0.89},
    {"class_name": "Psoriasis", "confidence": 0.08},
    {"class_name": "Dermatitis", "confidence": 0.03}
  ]
}
```

---

## 🔮 What’s Coming?

We’ve got some fun ideas brewing:

- **Smarter Models**: Mixing in more AI tricks.
- **Severity Checks**: Guessing how bad it is.
- **Mobile Vibes**: Taking it on the go.

Got ideas? Jump in and help us out!

---

## 🤝 Pitch In

1. Fork the repo.
2. Branch off (`git checkout -b feature/sweet-addition`).
3. Commit your stuff (`git commit -am 'Added something sweet'`).
4. Push it (`git push origin feature/sweet-addition`).
5. Open a Pull Request.

We’re stoked to see what you bring! 🚀

---

## 📜 License

MIT License—check the LICENSE file for the full scoop.

---

## ⚠️ Medical FYI

Quick note: This is for fun and learning, not a stand-in for a real doc. Got skin worries? See a healthcare pro! 🩺

---

## 📞 Help!

- Pop an issue on GitHub.
- Hit up the team.
- Dig into the docs for fixes.

---

**Built with ❤️ to make healthcare a bit smarter and way more accessible.**

