
# Sehat - AI-Powered Skin Disease Detection

A modern web application that leverages artificial intelligence to analyze skin conditions from uploaded images. Built with React, TypeScript, and Tailwind CSS for a seamless user experience.

## 🌟 Overview

Sehat provides instant skin disease analysis using advanced machine learning models. Users can upload images of skin conditions and receive AI-powered predictions with confidence scores, making preliminary skin health assessment more accessible.

## ✨ Features

- **AI-Powered Analysis**: Advanced machine learning models for skin condition detection
- **Instant Results**: Real-time image processing with confidence scoring
- **User-Friendly Interface**: Clean, intuitive design for easy navigation
- **Responsive Design**: Optimized for desktop, tablet, and mobile devices
- **Secure Image Processing**: Client-side image handling with secure backend integration
- **Modern Tech Stack**: Built with the latest web technologies

## 🛠️ Technology Stack

- **Frontend**: React 18, TypeScript, Vite
- **Styling**: Tailwind CSS, Shadcn/UI components
- **Routing**: React Router DOM
- **HTTP Client**: Axios
- **State Management**: React Hooks, TanStack Query
- **Authentication**: Firebase Authentication
- **Build Tool**: Vite for fast development and optimized builds

## 📋 Prerequisites

- Node.js 16.0 or higher
- npm or yarn package manager

## 🚀 Getting Started

### Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/thestonedape/Sehat.git
   cd Sehat
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Environment Configuration**
   ```bash
   cp .env.example .env
   ```
   Update the `.env` file with your API endpoints and configuration.

4. **Start Development Server**
   ```bash
   npm run dev
   ```
   
   Access the application at `http://localhost:5173`

### Build for Production

```bash
npm run build
```

The optimized build files will be generated in the `dist/` directory.

## 🏗️ Project Structure

```
src/
├── components/          # Reusable UI components
│   ├── ui/             # Shadcn/UI components
│   ├── Navbar.tsx      # Navigation component
│   ├── Footer.tsx      # Footer component
│   └── PredictionCard.tsx # Analysis results display
├── pages/              # Application pages
│   ├── Home.tsx        # Landing page
│   ├── About.tsx       # About page
│   ├── Contact.tsx     # Contact information
│   ├── Prediction.tsx  # Main analysis interface
│   └── History.tsx     # Analysis history
├── contexts/           # React contexts
├── hooks/              # Custom React hooks
├── lib/                # Utility functions
└── config/             # Configuration files
```

## 🔧 Configuration

### Environment Variables

Create a `.env` file in the root directory:

```env
VITE_API_URL=your_backend_api_url
VITE_FIREBASE_API_KEY=your_firebase_api_key
VITE_FIREBASE_AUTH_DOMAIN=your_firebase_auth_domain
VITE_FIREBASE_PROJECT_ID=your_firebase_project_id
```

### API Integration

The application expects a backend API with the following endpoints:

- `POST /upload-image/` - Image upload and analysis
- `GET /history/` - User analysis history
- `GET /health/` - API health check

## 🐳 Docker Deployment

Build and run using Docker:

```bash
docker build -t sehat-frontend .
docker run -p 3000:80 sehat-frontend
```

Or use Docker Compose:

```bash
docker-compose up --build
```

## 🚀 Deployment

### Recommended Platforms

- **Vercel**: Connect your GitHub repository for automatic deployments
- **Netlify**: Simple drag-and-drop deployment or GitHub integration
- **Railway**: Container-based deployment with Git integration
- **AWS S3 + CloudFront**: Static hosting with CDN

### Deployment Configuration

1. Build the project: `npm run build`
2. Upload the `dist/` folder contents to your hosting platform
3. Configure environment variables on your hosting platform
4. Set up custom domain (optional)

## 🧪 Development

### Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run preview` - Preview production build locally
- `npm run lint` - Run ESLint for code quality

### Code Quality

The project uses:
- TypeScript for type safety
- ESLint for code linting
- Prettier for code formatting (recommended)

## 🔐 Security

- All images are processed securely
- User authentication through Firebase
- Environment variables for sensitive configuration
- HTTPS enforced in production

## 📱 Browser Support

- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/new-feature`)
3. Commit your changes (`git commit -m 'Add new feature'`)
4. Push to the branch (`git push origin feature/new-feature`)
5. Open a Pull Request

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## ⚠️ Disclaimer

This application is for educational and informational purposes only. The AI predictions should not be considered as professional medical advice, diagnosis, or treatment. Always consult with qualified healthcare professionals for proper medical evaluation and treatment of skin conditions.

## 📞 Support

For questions, issues, or contributions, please contact:
- Email: contact.nishantjha@gmail.com
- GitHub Issues: [Create an issue](https://github.com/thestonedape/Sehat/issues)

## 🙏 Acknowledgments

- Built with modern web technologies
- Inspired by the need for accessible healthcare technology
- Community-driven development approach
