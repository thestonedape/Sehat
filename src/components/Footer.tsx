
const Footer = () => {
  return (
    <footer className="bg-white border-t border-slate-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
        <div className="flex flex-col md:flex-row justify-between items-center space-y-2 md:space-y-0">
          <div className="flex items-center space-x-2">
            <div className="w-6 h-6 bg-blue-600 rounded flex items-center justify-center">
              <span className="text-white font-bold text-sm">S</span>
            </div>
            <span className="text-lg font-semibold text-slate-900">Sehat</span>
          </div>
          
          <div className="text-center md:text-right">
            <p className="text-slate-600 text-sm">
              © 2024 Sehat. AI-Powered Skin Disease Detection
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
