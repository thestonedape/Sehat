
import React from 'react';
import { Link } from 'react-router-dom';
import { Upload, Shield, Zap, Users, ArrowRight } from 'lucide-react';

const Home = () => {
  const features = [
    {
      icon: <Upload className="h-8 w-8 text-blue-600" />,
      title: "Easy Upload",
      description: "Simply upload your skin image and let our AI analyze it for potential conditions"
    },
    {
      icon: <Zap className="h-8 w-8 text-blue-600" />,
      title: "AI Analysis",
      description: "Advanced machine learning algorithms provide accurate skin condition detection"
    },
    {
      icon: <Shield className="h-8 w-8 text-blue-600" />,
      title: "Secure & Private",
      description: "Your images are processed securely and never stored permanently"
    },
    {
      icon: <Users className="h-8 w-8 text-blue-600" />,
      title: "Expert Backed",
      description: "Developed with dermatologists to ensure clinical relevance"
    }
  ];

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="py-20 lg:py-32 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h1 className="text-4xl lg:text-6xl font-bold text-gray-900 mb-6">
              AI-Powered Skin
              <span className="text-blue-600"> Health Analysis</span>
            </h1>
            
            <p className="text-xl text-gray-600 mb-8 max-w-3xl mx-auto">
              Upload a skin image and get instant AI-powered analysis to identify potential skin conditions 
              with confidence scores and professional recommendations.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                to="/upload"
                className="inline-flex items-center px-8 py-4 bg-blue-600 text-white rounded-lg font-semibold hover:bg-blue-700 transition-colors"
              >
                Get Started
                <ArrowRight className="ml-2 h-5 w-5" />
              </Link>
              
              <Link
                to="/about"
                className="px-8 py-4 border border-gray-300 text-gray-700 rounded-lg font-semibold hover:bg-gray-50 transition-colors"
              >
                Learn More
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-4">
              Why Choose Sehat?
            </h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Experience the future of skin health analysis with our advanced AI technology
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {features.map((feature, index) => (
              <div key={index} className="bg-white rounded-xl p-6 shadow-sm hover:shadow-md transition-shadow">
                <div className="bg-blue-50 p-3 rounded-lg w-fit mb-4">
                  {feature.icon}
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-2">
                  {feature.title}
                </h3>
                <p className="text-gray-600">
                  {feature.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-blue-600">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl lg:text-4xl font-bold text-white mb-4">
            Ready to Analyze Your Skin?
          </h2>
          <p className="text-xl text-blue-100 mb-8 max-w-2xl mx-auto">
            Join thousands of users who trust Sehat for their skin health insights
          </p>
          <Link
            to="/upload"
            className="inline-flex items-center px-8 py-4 bg-white text-blue-600 rounded-lg font-semibold hover:bg-gray-50 transition-colors"
          >
            Start Analysis
            <ArrowRight className="ml-2 h-5 w-5" />
          </Link>
        </div>
      </section>
    </div>
  );
};

export default Home;
