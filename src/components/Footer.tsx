
import React from 'react';
import { Link } from 'react-router-dom';
import { Heart, Mail } from 'lucide-react';

const Footer = () => {
  return (
    <footer className="bg-white border-t border-gray-200 py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Logo and Description */}
          <div>
            <div className="flex items-center mb-4">
              <div className="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center mr-3">
                <Heart className="h-5 w-5 text-white" />
              </div>
              <span className="text-xl font-bold text-gray-900">Sehat</span>
            </div>
            <p className="text-gray-600 mb-4">
              AI-powered skin health analysis for educational purposes. 
              Get insights into potential skin conditions with our advanced technology.
            </p>
            <div className="flex items-center text-gray-500">
              <Mail className="h-4 w-4 mr-2" />
              <span>Contact us for more information</span>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-lg font-semibold text-gray-900 mb-4">
              Quick Links
            </h3>
            <ul className="space-y-2">
              {[
                { name: 'Home', path: '/' },
                { name: 'Upload', path: '/upload' },
                { name: 'About', path: '/about' },
                { name: 'Contact', path: '/contact' },
              ].map((item) => (
                <li key={item.name}>
                  <Link 
                    to={item.path} 
                    className="text-gray-600 hover:text-blue-600 transition-colors"
                  >
                    {item.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Legal */}
          <div>
            <h3 className="text-lg font-semibold text-gray-900 mb-4">
              Legal
            </h3>
            <p className="text-gray-600 text-sm">
              © 2024 Sehat. This application is for educational purposes only. 
              Not intended for medical diagnosis or treatment.
            </p>
          </div>
        </div>

        <div className="border-t border-gray-200 mt-8 pt-8 text-center">
          <p className="text-gray-500 text-sm">
            Made with <Heart className="h-4 w-4 inline text-red-500" /> for better skin health awareness
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
