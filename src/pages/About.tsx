const About = () => {
  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
      <div className="space-y-12">
        <div className="text-center">
          <h1 className="text-4xl font-bold text-slate-900 mb-6">About Sehat</h1>
          <p className="text-xl text-slate-600 leading-relaxed">
            Revolutionizing skin health through artificial intelligence and accessible technology
          </p>
        </div>

        <div className="prose prose-lg max-w-none space-y-6">
          <div className="bg-white rounded-xl shadow-lg p-8 space-y-6 my-6">
            <h2 className="text-2xl font-semibold text-slate-900">Our Mission</h2>
            <p className="text-slate-600 leading-relaxed">
              Sehat aims to democratize access to preliminary skin health analysis through 
              cutting-edge artificial intelligence. We believe that early detection and 
              awareness can make a significant difference in skin health outcomes.
            </p>
          </div>

          <div className="bg-white rounded-xl shadow-lg p-8 space-y-6 my-6">
            <h2 className="text-2xl font-semibold text-slate-900">How It Works</h2>
            <div className="space-y-4">
              <div className="flex items-start space-x-4">
                <div className="w-8 h-8 bg-blue-600 text-white rounded-full flex items-center justify-center font-semibold">
                  1
                </div>
                <div>
                  <h3 className="font-semibold text-slate-900">Upload Image</h3>
                  <p className="text-slate-600">Upload a clear photo of the skin area you want analyzed</p>
                </div>
              </div>
              <div className="flex items-start space-x-4">
                <div className="w-8 h-8 bg-blue-600 text-white rounded-full flex items-center justify-center font-semibold">
                  2
                </div>
                <div>
                  <h3 className="font-semibold text-slate-900">AI Analysis</h3>
                  <p className="text-slate-600">Our trained model analyzes the image using advanced computer vision</p>
                </div>
              </div>
              <div className="flex items-start space-x-4">
                <div className="w-8 h-8 bg-blue-600 text-white rounded-full flex items-center justify-center font-semibold">
                  3
                </div>
                <div>
                  <h3 className="font-semibold text-slate-900">Get Results</h3>
                  <p className="text-slate-600">Receive instant predictions with confidence scores and recommendations</p>
                </div>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-xl shadow-lg p-8 space-y-6 my-6">
            <h2 className="text-2xl font-semibold text-slate-900">Technology Stack</h2>
            <div className="grid md:grid-cols-2 gap-6">
              <div>
                <h3 className="font-semibold text-slate-900 mb-2">Frontend</h3>
                <ul className="text-slate-600 space-y-1">
                  <li>• React with TypeScript</li>
                  <li>• Vite for fast development</li>
                  <li>• Tailwind CSS for styling</li>
                  <li>• Responsive design principles</li>
                </ul>
              </div>
              <div>
                <h3 className="font-semibold text-slate-900 mb-2">Backend</h3>
                <ul className="text-slate-600 space-y-1">
                  <li>• FastAPI for high performance</li>
                  <li>• PyTorch for deep learning</li>
                  <li>• OpenCV for image processing</li>
                  <li>• Docker for containerization</li>
                </ul>
              </div>
            </div>
          </div>

          <div className="bg-yellow-50 border border-yellow-200 rounded-xl p-8 space-y-6 my-6">
            <h2 className="text-2xl font-semibold text-slate-900 mb-4">Important Disclaimer</h2>
            <p className="text-slate-700 leading-relaxed">
              Sehat is designed for educational and informational purposes only. The AI predictions 
              should not be considered as medical advice or diagnosis. Always consult with qualified 
              healthcare professionals for proper medical evaluation and treatment of skin conditions.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default About;