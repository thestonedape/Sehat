
# Sehat - AI-Powered Skin Disease Detection

A modern, professional web application for skin disease classification using artificial intelligence. Built with React, TypeScript, and Tailwind CSS, designed to integrate seamlessly with a FastAPI backend.

## 🚀 Features

- **Modern UI/UX**: Clean, professional design with health-tech aesthetic
- **Image Upload**: Drag-and-drop or click-to-upload functionality
- **AI Analysis**: Real-time skin disease prediction with confidence scores
- **Responsive Design**: Mobile-first approach, works on all devices
- **Docker Ready**: Containerized for easy deployment
- **Production Ready**: Optimized builds and deployment configurations

## 🛠️ Tech Stack

**Frontend:**
- React 18 with TypeScript
- Vite for fast development and builds
- Tailwind CSS for styling
- React Router for navigation
- Axios for API calls

**Backend Integration:**
- FastAPI backend support
- Image upload and processing
- AI model predictions
- Text extraction capabilities

## 📋 Prerequisites

- Node.js 18+ and npm
- Docker (optional, for containerized deployment)

## 🔧 Installation & Setup

1. **Clone the repository**
   ```bash
   git clone https://github.com/thestonedape/Sehat.git
   cd Sehat
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Environment setup**
   ```bash
   cp .env.example .env
   # Edit .env to configure your backend API URL
   ```

4. **Start development server**
   ```bash
   npm run dev
   ```

   The app will be available at `http://localhost:5173`

## 🏗️ Build for Production

```bash
npm run build
```

The built files will be in the `dist/` directory.

## 🐳 Docker Deployment

1. **Build and run with Docker Compose**
   ```bash
   docker-compose up --build
   ```

2. **Or build manually**
   ```bash
   docker build -t sehat-frontend .
   docker run -p 80:80 sehat-frontend
   ```

## 🚀 Deployment Options

### Free Hosting Platforms

**Render.com:**
1. Connect your GitHub repository
2. Set build command: `npm run build`
3. Set publish directory: `dist`
4. Deploy!

**Railway.app:**
1. Connect GitHub repository
2. Railway will auto-detect and deploy
3. Configure environment variables

**Netlify:**
1. Connect GitHub repository
2. Build command: `npm run build`
3. Publish directory: `dist`
4. Deploy with continuous integration

## 🔧 Environment Variables

Create a `.env` file in the root directory:

```env
VITE_API_URL=http://localhost:8000
```

For production, update `VITE_API_URL` to your deployed backend URL.

## 📁 Project Structure

```
src/
├── components/          # Reusable UI components
│   ├── Navbar.tsx      # Navigation component
│   ├── Footer.tsx      # Footer component
│   └── PredictionCard.tsx # Results display
├── pages/              # Page components
│   ├── Home.tsx        # Landing page
│   ├── About.tsx       # About page
│   ├── Contact.tsx     # Contact page
│   └── Prediction.tsx  # Main analysis page
├── App.tsx             # Main app component
└── main.tsx           # App entry point
```

## 🎨 Design System

**Colors:**
- Primary: Blue (#1e40af, #3b82f6)
- Backgrounds: Light gray (#f8fafc, #e5e7eb)
- Text: Slate variations
- Accents: Blue variants

**Typography:**
- Font Family: Inter (Google Fonts)
- Modern, clean sans-serif design

## 🔌 API Integration

The frontend expects a FastAPI backend with the following endpoint:

```
POST /upload-image/
```

**Request:** FormData with image file
**Response:** 
```json
{
  "prediction": "Acne Vulgaris",
  "confidence": 0.85,
  "extracted_text": "Optional extracted text"
}
```

## 🧪 Development

**Available Scripts:**
- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run preview` - Preview production build
- `npm run lint` - Run ESLint

## 🚨 Important Disclaimer

This application is for educational and informational purposes only. The AI predictions should not be considered as medical advice or diagnosis. Always consult with qualified healthcare professionals for proper medical evaluation and treatment.

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📄 License

This project is open source and available under the [MIT License](LICENSE).

## 👥 Team

Built with ❤️ for accessible healthcare technology.

## 🔗 Links

- [GitHub Repository](https://github.com/thestonedape/Sehat)
- [Live Demo](https://your-demo-url.com)
