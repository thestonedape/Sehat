
import { Mail, Github } from "lucide-react";

const Contact = () => {
  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
      <div className="space-y-12">
        <div className="text-center">
          <h1 className="text-4xl font-bold text-slate-900 mb-6">Get in Touch</h1>
          <p className="text-xl text-slate-600 leading-relaxed">
            Have questions about Sehat? We'd love to hear from you.
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-8">
          <div className="bg-white rounded-xl shadow-lg p-8 space-y-6">
            <h2 className="text-2xl font-semibold text-slate-900">Contact Information</h2>
            
            <div className="space-y-4">
              <div className="flex items-center space-x-4">
                <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center">
                  <Mail className="text-blue-600" size={24} />
                </div>
                <div>
                  <h3 className="font-semibold text-slate-900">Email</h3>
                  <p className="text-slate-600">contact.nishantjha@gmail.com</p>
                </div>
              </div>

              <div className="flex items-center space-x-4">
                <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center">
                  <Github className="text-blue-600" size={24} />
                </div>
                <div>
                  <h3 className="font-semibold text-slate-900">GitHub</h3>
                  <a 
                    href="https://github.com/thestonedape/Sehat" 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="text-blue-600 hover:text-blue-700 transition-colors duration-200"
                  >
                    github.com/thestonedape/Sehat
                  </a>
                </div>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-xl shadow-lg p-8 space-y-6">
            <h2 className="text-2xl font-semibold text-slate-900">Project Info</h2>
            
            <div className="space-y-4">
              <div>
                <h3 className="font-semibold text-slate-900 mb-2">Development Status</h3>
                <p className="text-slate-600">
                  Sehat is actively being developed as an open-source project. 
                  We welcome contributions and feedback from the community.
                </p>
              </div>

              <div>
                <h3 className="font-semibold text-slate-900 mb-2">Contributing</h3>
                <p className="text-slate-600">
                  Interested in contributing? Check out our GitHub repository 
                  for contribution guidelines and open issues.
                </p>
              </div>

              <div>
                <h3 className="font-semibold text-slate-900 mb-2">Feedback</h3>
                <p className="text-slate-600">
                  Your feedback helps us improve Sehat. Feel free to open 
                  issues or discussions on our GitHub repository.
                </p>
              </div>
            </div>
          </div>
        </div>

        <div className="bg-blue-50 border border-blue-200 rounded-xl p-8 text-center">
          <h2 className="text-2xl font-semibold text-slate-900 mb-4">
            Join Our Mission
          </h2>
          <p className="text-slate-700 leading-relaxed mb-6">
            Help us make skin health analysis more accessible to everyone. 
            Whether you're a developer, designer, or healthcare professional, 
            there are many ways to contribute to Sehat.
          </p>
          <a
            href="https://github.com/thestonedape/Sehat"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center px-6 py-3 bg-blue-600 text-white font-semibold rounded-lg hover:bg-blue-700 transition-colors duration-200"
          >
            <Github className="mr-2" size={20} />
            View on GitHub
          </a>
        </div>
      </div>
    </div>
  );
};

export default Contact;
