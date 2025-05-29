import React, { useState } from 'react';
import Hero from './Hero';
import Navigation from './Navigation';
import AuthForms from '../auth/AuthForms';

const LandingPage = () => {
  const [showAuth, setShowAuth] = useState(false);
  const [authType, setAuthType] = useState('login');
  
  const handleAuthClick = (type) => {
    setAuthType(type);
    setShowAuth(true);
  };
  
  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-50 to-white dark:from-gray-900 dark:to-gray-800">
      <Navigation 
        onLoginClick={() => handleAuthClick('login')} 
        onSignupClick={() => handleAuthClick('signup')} 
      />
      
      {showAuth ? (
        <div className="fixed inset-0 bg-black/50 dark:bg-black/70 flex items-center justify-center z-50 p-4 backdrop-blur-sm">
          <div 
            className="relative max-w-md w-full animate-fadeIn"
            onClick={(e) => e.stopPropagation()}
          >
            <button 
              onClick={() => setShowAuth(false)}
              className="absolute -top-12 right-0 text-white hover:text-blue-200 transition-colors"
              aria-label="Close"
            >
              <span className="text-xl">×</span> Close
            </button>
            <AuthForms initialView={authType} />
          </div>
        </div>
      ) : (
        <>
          <Hero onGetStarted={() => handleAuthClick('signup')} />
          
         
        </>
      )}
      
      <footer className="bg-gray-800 dark:bg-gray-900 text-white py-12">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div>
              <h3 className="text-xl font-bold mb-4">HealthBot</h3>
              <p className="text-gray-300 dark:text-gray-400">Your personal AI health assistant to help you achieve your fitness and wellness goals.</p>
            </div>
            <div>
              <h3 className="text-lg font-bold mb-4">Quick Links</h3>
              <ul className="space-y-2">
                <li><a href="#features" className="text-gray-300 dark:text-gray-400 hover:text-white transition-colors">Features</a></li>
                <li><a href="#how-it-works" className="text-gray-300 dark:text-gray-400 hover:text-white transition-colors">How It Works</a></li>
                <li><a href="#about" className="text-gray-300 dark:text-gray-400 hover:text-white transition-colors">About Us</a></li>
              </ul>
            </div>
            <div>
              <h3 className="text-lg font-bold mb-4">Connect With Us</h3>
              <div className="flex space-x-4">
                <a href="#" className="text-gray-300 dark:text-gray-400 hover:text-white transition-colors">Twitter</a>
                <a href="#" className="text-gray-300 dark:text-gray-400 hover:text-white transition-colors">Instagram</a>
                <a href="#" className="text-gray-300 dark:text-gray-400 hover:text-white transition-colors">Facebook</a>
              </div>
            </div>
          </div>
          <div className="mt-8 pt-8 border-t border-gray-700 text-center text-gray-400">
            <p>© {new Date().getFullYear()} HealthBot. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default LandingPage;