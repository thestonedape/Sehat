
import React from 'react';
import { Brain, Shield, Users, Award } from 'lucide-react';

const About = () => {
  const features = [
    {
      icon: <Brain className="h-8 w-8 text-blue-600" />,
      title: "Advanced AI Technology",
      description: "Our machine learning models are trained on thousands of dermatologist-verified images to provide accurate skin condition detection."
    },
    {
      icon: <Shield className="h-8 w-8 text-blue-600" />,
      title: "Privacy First",
      description: "Your images are processed securely and never stored permanently. We prioritize your privacy and data security above all."
    },
    {
      icon: <Users className="h-8 w-8 text-blue-600" />,
      title: "Expert Collaboration",
      description: "Developed in partnership with dermatologists and medical professionals to ensure clinical relevance and accuracy."
    },
    {
      icon: <Award className="h-8 w-8 text-blue-600" />,
      title: "Clinically Validated",
      description: "Our algorithms undergo rigorous testing and validation to meet the highest standards of medical AI applications."
    }
  ];

  return (
    <div className="min-h-screen py-12">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-16">
          <h1 className="text-4xl font-bold text-gray-900 mb-6">
            About Sehat
          </h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Empowering individuals to take control of their skin health through cutting-edge AI technology 
            and dermatologist-backed insights.
          </p>
        </div>

        {/* Mission Section */}
        <div className="bg-white rounded-2xl shadow-lg p-8 mb-12">
          <h2 className="text-3xl font-bold text-gray-900 mb-6 text-center">
            Our Mission
          </h2>
          <p className="text-lg text-gray-700 leading-relaxed mb-6">
            At Sehat, we believe that everyone deserves access to reliable skin health information. 
            Our mission is to democratize dermatological screening by making advanced AI-powered 
            skin analysis accessible to people worldwide.
          </p>
          <p className="text-lg text-gray-700 leading-relaxed">
            We're committed to bridging the gap between cutting-edge medical technology and 
            everyday healthcare needs, providing users with valuable insights while emphasizing 
            the importance of professional medical consultation.
          </p>
        </div>

        {/* Features Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">
          {features.map((feature, index) => (
            <div
              key={index}
              className="bg-white rounded-xl shadow-lg p-6 hover:shadow-xl transition-shadow"
            >
              <div className="bg-blue-50 p-3 rounded-full w-14 h-14 mb-4 flex items-center justify-center">
                {feature.icon}
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-3">
                {feature.title}
              </h3>
              <p className="text-gray-600">
                {feature.description}
              </p>
            </div>
          ))}
        </div>

        {/* Technology Section */}
        <div className="bg-gradient-to-r from-blue-600 to-indigo-600 rounded-2xl p-8 text-white mb-12">
          <h2 className="text-3xl font-bold mb-6 text-center">
            Our Technology
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div>
              <h3 className="text-xl font-semibold mb-3">Deep Learning Models</h3>
              <p className="text-blue-100">
                Our convolutional neural networks are specifically designed for dermatological 
                image analysis, trained on diverse datasets to ensure accuracy across different 
                skin types and conditions.
              </p>
            </div>
            <div>
              <h3 className="text-xl font-semibold mb-3">Continuous Learning</h3>
              <p className="text-blue-100">
                Our AI models are continuously updated with the latest research and clinical 
                findings to improve accuracy and expand the range of detectable conditions.
              </p>
            </div>
          </div>
        </div>

        {/* Disclaimer */}
        <div className="bg-yellow-50 border border-yellow-200 rounded-2xl p-6">
          <h3 className="text-xl font-semibold text-yellow-900 mb-4">
            Important Notice
          </h3>
          <p className="text-yellow-800 mb-4">
            Sehat is designed as an educational tool and preliminary screening aid. 
            Our AI analysis should never replace professional medical advice, diagnosis, or treatment.
          </p>
          <ul className="text-yellow-800 space-y-2 list-disc list-inside">
            <li>Always consult with qualified healthcare professionals for medical concerns</li>
            <li>Use our tool as a supplementary resource, not a diagnostic instrument</li>
            <li>Seek immediate medical attention for any concerning skin changes</li>
            <li>Our AI has limitations and may not detect all conditions accurately</li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default About;
