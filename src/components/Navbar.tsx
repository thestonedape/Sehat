
import { Link, useLocation } from "react-router-dom";
import { User, LogOut, Menu, X } from "lucide-react";
import { useState } from "react";
import { useAuth } from "../contexts/AuthContext";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogTrigger,
} from "@/components/ui/dialog";
import Login from "./Login";

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isLoginModalOpen, setIsLoginModalOpen] = useState(false);
  const location = useLocation();
  const { currentUser, logout } = useAuth();

  const isActive = (path: string) => location.pathname === path;

  const navLinks = [
    { path: "/", label: "Home" },
    { path: "/prediction", label: "Analysis" },
    { path: "/history", label: "History" },
    { path: "/about", label: "About" },
    { path: "/contact", label: "Contact" },
  ];

  return (
    <nav className="bg-white shadow-sm border-b border-slate-200 sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <Link to="/" className="flex items-center space-x-2">
            <div className="w-6 h-6 flex items-center justify-center">
              <img
                src="/Icon.png"
                alt="Icon"
                className="w-6 h-6 object-contain"
              />
            </div>

            <span className="text-xl font-bold text-slate-900">Sehat</span>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-8">
            {navLinks.map((link) => (
              <Link
                key={link.path}
                to={link.path}
                className={`text-sm font-medium transition-colors duration-200 ${isActive(link.path)
                    ? "text-blue-600 border-b-2 border-blue-600 pb-1"
                    : "text-slate-600 hover:text-slate-900"
                  }`}
              >
                {link.label}
              </Link>
            ))}
          </div>

          {/* User Menu */}
          <div className="hidden md:flex items-center space-x-4">
            {currentUser ? (
              <div className="flex items-center space-x-3">
                <div className="flex items-center space-x-2">
                  <User size={20} className="text-slate-600" />
                  <span className="text-sm text-slate-700">
                    {currentUser.displayName || currentUser.email}
                  </span>
                </div>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => logout()}
                  className="text-slate-600 hover:text-slate-900"
                >
                  <LogOut size={16} />
                </Button>
              </div>
            ) : (
              <Dialog open={isLoginModalOpen} onOpenChange={setIsLoginModalOpen}>
                <DialogTrigger asChild>
                  <Button variant="outline" size="sm">
                    Sign In
                  </Button>
                </DialogTrigger>
                <DialogContent className="p-0 max-w-md">
                  <Login />
                </DialogContent>
              </Dialog>
            )}
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden">
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="p-2 rounded-md text-slate-600 hover:text-slate-900 hover:bg-slate-100"
            >
              {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>

        {/* Mobile Navigation */}
        {isMenuOpen && (
          <div className="md:hidden py-4 border-t border-slate-200">
            <div className="flex flex-col space-y-4">
              {navLinks.map((link) => (
                <Link
                  key={link.path}
                  to={link.path}
                  onClick={() => setIsMenuOpen(false)}
                  className={`text-sm font-medium px-2 py-1 rounded transition-colors duration-200 ${isActive(link.path)
                      ? "text-blue-600 bg-blue-50"
                      : "text-slate-600 hover:text-slate-900 hover:bg-slate-50"
                    }`}
                >
                  {link.label}
                </Link>
              ))}
              {currentUser ? (
                <button
                  onClick={() => {
                    logout();
                    setIsMenuOpen(false);
                  }}
                  className="text-sm font-medium text-slate-600 hover:text-slate-900 px-2 py-1 text-left"
                >
                  Sign Out
                </button>
              ) : (
                <Dialog>
                  <DialogTrigger asChild>
                    <button
                      onClick={() => setIsMenuOpen(false)}
                      className="text-sm font-medium text-slate-600 hover:text-slate-900 px-2 py-1 text-left"
                    >
                      Sign In
                    </button>
                  </DialogTrigger>
                  <DialogContent className="p-0 max-w-md">
                    <Login />
                  </DialogContent>
                </Dialog>
              )}
            </div>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
