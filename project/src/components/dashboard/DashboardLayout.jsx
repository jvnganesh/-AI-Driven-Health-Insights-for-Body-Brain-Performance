import React, { useState, useEffect } from 'react';
import { createClient } from '@supabase/supabase-js';
import {
  LayoutDashboard,
  Activity,
  Brain,
  Info,
  Sun,
  Moon,
  LogOut,
  Menu,
  X,
  MessageSquare
} from 'lucide-react';
import Dashboard from './Dashboard';
import PhysicalHealth from './PhysicalHealth';
import MentalHealth from './MentalHealth';
import About from './About';

const supabase = createClient(
  import.meta.env.VITE_SUPABASE_URL,
  import.meta.env.VITE_SUPABASE_ANON_KEY
);

const DashboardLayout = ({ children }) => {
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [activeTab, setActiveTab] = useState('dashboard');
  const [isChatbotOpen, setIsChatbotOpen] = useState(false);

  useEffect(() => {
    const savedTheme = localStorage.getItem('theme');
    if (savedTheme) {
      setIsDarkMode(savedTheme === 'dark');
      document.documentElement.classList.toggle('dark', savedTheme === 'dark');
    } else {
      localStorage.setItem('theme', 'light');
    }

    const script1 = document.createElement('script');
    script1.src = 'https://cdn.botpress.cloud/webchat/v2.5/inject.js';
    script1.async = true;
    document.body.appendChild(script1);

    const script2 = document.createElement('script');
    script2.src = 'https://files.bpcontent.cloud/2025/05/13/07/20250513072820-V6B8QE86.js';
    script2.async = true;
    document.body.appendChild(script2);

    return () => {
      document.body.removeChild(script1);
      document.body.removeChild(script2);
    };
  }, []);

  const handleDarkModeToggle = () => {
    const newMode = !isDarkMode;
    setIsDarkMode(newMode);
    document.documentElement.classList.toggle('dark', newMode);
    localStorage.setItem('theme', newMode ? 'dark' : 'light');
  };

  const handleLogout = async () => {
    try {
      await supabase.auth.signOut();
      window.location.href = '/';
    } catch (error) {
      console.error('Error logging out:', error);
    }
  };

  const toggleChatbot = () => {
    setIsChatbotOpen(!isChatbotOpen);
    if (window.botpressWebChat) {
      if (!isChatbotOpen) {
        window.botpressWebChat.sendEvent({ type: 'show' });
      } else {
        window.botpressWebChat.sendEvent({ type: 'hide' });
      }
    }
  };

  const navigationItems = [
    { id: 'dashboard', label: 'Dashboard', icon: LayoutDashboard },
    { id: 'physical', label: 'Physical Health', icon: Activity },
    { id: 'mental', label: 'Mental Health', icon: Brain },
    { id: 'about', label: 'About Us', icon: Info },
  ];

  const renderContent = () => {
    switch (activeTab) {
      case 'dashboard':
        return <Dashboard />;
      case 'physical':
        return <PhysicalHealth />;
      case 'mental':
        return <MentalHealth />;
      case 'about':
        return <About />;
      default:
        return <Dashboard />;
    }
  };

  return (
    <div className={`min-h-screen ${isDarkMode ? 'dark' : ''}`}>
      <div className="flex h-screen bg-gray-50 dark:bg-gray-900">
        {/* Overlay */}
        {isSidebarOpen && (
          <div
            className="fixed inset-0 bg-black bg-opacity-50 z-40 lg:hidden"
            onClick={() => setIsSidebarOpen(false)}
          />
        )}

        {/* Sidebar */}
        <aside
          className={`fixed lg:static inset-y-0 left-0 z-50 w-64 transform bg-white dark:bg-gray-800 shadow-lg transition-transform duration-300 ease-in-out ${
            isSidebarOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'
          }`}
        >
          <div className="flex h-full flex-col">
            {/* Logo */}
            <div className="flex items-center justify-between px-6 py-4 border-b dark:border-gray-700">
              <div className="flex items-center space-x-2">
                <Activity className="h-8 w-8 text-blue-600" />
                <span className="text-xl font-bold text-gray-800 dark:text-white">FitTrack</span>
              </div>
              <button
                className="lg:hidden text-gray-500 hover:text-gray-600 dark:text-gray-400 dark:hover:text-gray-300"
                onClick={() => setIsSidebarOpen(false)}
              >
                <X className="h-6 w-6" />
              </button>
            </div>

            {/* Navigation */}
            <nav className="flex-1 overflow-y-auto px-4 py-6">
              <ul className="space-y-2">
                {navigationItems.map((item) => {
                  const Icon = item.icon;
                  return (
                    <li key={item.id}>
                      <button
                        onClick={() => {
                          setActiveTab(item.id);
                          setIsSidebarOpen(false);
                        }}
                        className={`flex w-full items-center space-x-3 rounded-lg px-4 py-2.5 transition-colors ${
                          activeTab === item.id
                            ? 'bg-blue-50 text-blue-600 dark:bg-blue-900/50 dark:text-blue-400'
                            : 'text-gray-700 hover:bg-gray-100 dark:text-gray-300 dark:hover:bg-gray-700/50'
                        }`}
                      >
                        <Icon className="h-5 w-5" />
                        <span>{item.label}</span>
                      </button>
                    </li>
                  );
                })}
              </ul>
            </nav>

            {/* Bottom Actions */}
            <div className="border-t dark:border-gray-700 px-4 py-4 space-y-2">
              <button
                onClick={handleDarkModeToggle}
                className="flex w-full items-center space-x-3 rounded-lg px-4 py-2.5 text-gray-700 hover:bg-gray-100 dark:text-gray-300 dark:hover:bg-gray-700/50"
              >
                {isDarkMode ? <Moon className="h-5 w-5" /> : <Sun className="h-5 w-5" />}
                <span>{isDarkMode ? 'Light Mode' : 'Dark Mode'}</span>
              </button>
              <button
                onClick={handleLogout}
                className="flex w-full items-center space-x-3 rounded-lg px-4 py-2.5 text-red-600 hover:bg-red-50 dark:text-red-400 dark:hover:bg-red-900/50"
              >
                <LogOut className="h-5 w-5" />
                <span>Log Out</span>
              </button>
            </div>
          </div>
        </aside>

        {/* Main Content */}
        <div className="flex flex-1 flex-col overflow-hidden">
          {/* Top Bar */}
          <header className="bg-white dark:bg-gray-800 shadow-sm">
            <div className="flex items-center justify-between px-6 py-4">
              <button
                className="text-gray-500 hover:text-gray-600 dark:text-gray-400 dark:hover:text-gray-300"
                onClick={() => setIsSidebarOpen(!isSidebarOpen)}
              >
                <Menu className="h-6 w-6" />
              </button>

              <div className="flex items-center ml-auto space-x-4">
                <button
                  onClick={toggleChatbot}
                  className="p-2 text-gray-500 hover:text-gray-600 dark:text-gray-400 dark:hover:text-gray-300 rounded-full hover:bg-gray-100 dark:hover:bg-gray-700"
                >
                  <MessageSquare className="h-6 w-6" />
                </button>
                <div className="relative">
                  <img
                    src="https://api.dicebear.com/7.x/avataaars/svg?seed=Anekaga"
                    alt="Profile"
                    className="h-8 w-8 rounded-full bg-gray-200"
                  />
                  <div className="absolute bottom-0 right-0 h-3 w-3 rounded-full border-2 border-white bg-green-400"></div>
                </div>
              </div>
            </div>
          </header>

          {/* Main Content Area */}
          <main className="flex-1 overflow-y-auto bg-gray-50 dark:bg-gray-900 p-6">
            {renderContent()}
          </main>
        </div>
      </div>
    </div>
  );
};

export default DashboardLayout;