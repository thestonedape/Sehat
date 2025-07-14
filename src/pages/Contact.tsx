
import { Mail, Github } from "lucide-react";

const Contact = () => {
  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-16">
      <div className="space-y-8 sm:space-y-12">
        <div className="text-center">
          <h1 className="text-3xl sm:text-4xl font-bold text-slate-900 mb-4 sm:mb-6">Get in Touch</h1>
          <p className="text-lg sm:text-xl text-slate-600 leading-relaxed px-2">
            Have questions about Sehat? We'd love to hear from you.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 sm:gap-8">
          <div className="bg-white rounded-xl shadow-lg p-4 sm:p-6 lg:p-8 space-y-4 sm:space-y-6">
            <h2 className="text-xl sm:text-2xl font-semibold text-slate-900">Contact Information</h2>
            
            <div className="space-y-4">
              <div className="flex items-start sm:items-center space-x-3 sm:space-x-4">
                <div className="w-10 h-10 sm:w-12 sm:h-12 bg-blue-100 rounded-lg flex items-center justify-center flex-shrink-0">
                  <Mail className="text-blue-600" size={20} />
                </div>
                <div className="min-w-0 flex-1">
                  <h3 className="font-semibold text-slate-900 text-sm sm:text-base">Email</h3>
                  <p className="text-slate-600 text-sm sm:text-base break-all">contact.nishantjha@gmail.com</p>
                </div>
              </div>

              <div className="flex items-start sm:items-center space-x-3 sm:space-x-4">
                <div className="w-10 h-10 sm:w-12 sm:h-12 bg-blue-100 rounded-lg flex items-center justify-center flex-shrink-0">
                  <Github className="text-blue-600" size={20} />
                </div>
                <div className="min-w-0 flex-1">
                  <h3 className="font-semibold text-slate-900 text-sm sm:text-base">GitHub</h3>
                  <a 
                    href="https://github.com/thestonedape/Sehat" 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="text-blue-600 hover:text-blue-700 transition-colors duration-200 text-sm sm:text-base break-all"
                  >
                    github.com/thestonedape/Sehat
                  </a>
                </div>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-xl shadow-lg p-4 sm:p-6 lg:p-8 space-y-4 sm:space-y-6">
            <h2 className="text-xl sm:text-2xl font-semibold text-slate-900">Project Info</h2>
            
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

        <div className="bg-blue-50 border border-blue-200 rounded-xl p-4 sm:p-6 lg:p-8 text-center">
          <h2 className="text-xl sm:text-2xl font-semibold text-slate-900 mb-4">
            Join Our Mission
          </h2>
          <p className="text-slate-700 leading-relaxed mb-6 px-2">
            Help us make skin health analysis more accessible to everyone. 
            Whether you're a developer, designer, or healthcare professional, 
            there are many ways to contribute to Sehat.
          </p>
          <a
            href="https://github.com/thestonedape/Sehat"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center px-4 sm:px-6 py-3 bg-blue-600 text-white font-semibold rounded-lg hover:bg-blue-700 transition-colors duration-200 text-sm sm:text-base"
          >
            <Github className="mr-2" size={18} />
            View on GitHub
          </a>
        </div>
      </div>
    </div>
  );
};

export default Contact;