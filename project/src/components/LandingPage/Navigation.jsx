import React, { useState, useEffect } from 'react';
import { Activity } from 'lucide-react';

const Navigation = ({ onLoginClick, onSignupClick }) => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };
    
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);
  
  return (
    <nav className={`fixed top-0 left-0 right-0 z-40 px-4 transition-all duration-300 ${
      isScrolled ? 'bg-white shadow-md py-3' : 'bg-transparent py-5'
    }`}>
      <div className="container mx-auto">
        <div className="flex justify-between items-center">
          <div className="flex items-center">
            <div className="flex items-center mr-4">
              <div className={`rounded-lg p-2 mr-2 transition-colors ${
                isScrolled ? 'bg-blue-100 text-blue-600' : 'bg-blue-600 text-white'
              }`}>
                <Activity className="h-6 w-6" />
              </div>
              <span className={`font-bold text-xl transition-colors ${
                isScrolled ? 'text-gray-800' : 'text-white'
              }`}>
                HealthBot
              </span>
            </div>
            
            <div className="hidden md:flex space-x-8">
              <a href="#features" className={`transition-colors ${
                isScrolled ? 'text-gray-700 hover:text-blue-600' : 'text-white hover:text-blue-200'
              }`}>
                Features
              </a>
              <a href="#how-it-works" className={`transition-colors ${
                isScrolled ? 'text-gray-700 hover:text-blue-600' : 'text-white hover:text-blue-200'
              }`}>
                How It Works
              </a>
              
            </div>
          </div>
          
          <div className="hidden md:flex items-center space-x-4">
            <button 
              onClick={onLoginClick}
              className={`font-medium transition-colors ${
                isScrolled ? 'text-gray-700 hover:text-blue-600' : 'text-white hover:text-blue-200'
              }`}
            >
              Log in
            </button>
            <button 
              onClick={onSignupClick}
              className={`px-4 py-2 rounded-lg transition-all transform hover:-translate-y-0.5 ${
                isScrolled 
                  ? 'bg-blue-600 hover:bg-blue-700 text-white' 
                  : 'bg-white hover:bg-gray-100 text-blue-600'
              }`}
            >
              Sign up
            </button>
          </div>
          
          <button 
            className="md:hidden"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            aria-label="Toggle menu"
          >
            <svg 
              className={`w-6 h-6 transition-colors ${
                isScrolled ? 'text-gray-800' : 'text-white'
              }`} 
              fill="none" 
              stroke="currentColor" 
              viewBox="0 0 24 24"
            >
              {isMobileMenuOpen 
                ? <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" /> 
                : <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              }
            </svg>
          </button>
        </div>
        
        {/* Mobile menu */}
        {isMobileMenuOpen && (
          <div className="md:hidden pt-4 pb-2 animate-fadeDown">
            <div className="flex flex-col space-y-3">
              <a 
                href="#features" 
                className="text-gray-800 py-2"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                Features
              </a>
              <a 
                href="#how-it-works" 
                className="text-gray-800 py-2"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                How It Works
              </a>
              <div className="pt-2 flex flex-col space-y-3">
                <button 
                  onClick={() => {
                    onLoginClick();
                    setIsMobileMenuOpen(false);
                  }}
                  className="py-2 text-gray-800"
                >
                  Log in
                </button>
                <button 
                  onClick={() => {
                    onSignupClick();
                    setIsMobileMenuOpen(false);
                  }}
                  className="bg-blue-600 hover:bg-blue-700 text-white py-2 px-4 rounded-lg"
                >
                  Sign up
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navigation;