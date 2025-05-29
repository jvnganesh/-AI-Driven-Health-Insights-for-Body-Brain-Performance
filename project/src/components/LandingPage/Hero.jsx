import React from 'react';
import { Heart, Activity, Trophy, CheckCircle, Bot } from 'lucide-react';

const Hero = ({ onGetStarted }) => {
  return (
    <div className="container mx-auto px-4 py-12 md:py-20">
      <div className="flex flex-col md:flex-row items-center">
        <div className="md:w-1/2 md:pr-12">
          <h1 className="text-4xl md:text-5xl font-bold text-blue-600 mb-4 leading-tight">
            Your Personal <span className="text-blue-600">Health Assistant</span>
          </h1>
          <p className="text-xl text-gray-400 mb-8">
            Track your fitness journey, get personalized recommendations, and achieve your health goals with our AI-powered health bot.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 mb-10">
            <button
              onClick={onGetStarted}
              className="bg-blue-600 hover:bg-blue-700 text-white font-medium py-3 px-8 rounded-lg shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1"
            >
              Get Started Free
            </button>
            
            <button className="bg-white hover:bg-gray-50 text-blue-600 border border-blue-600 font-medium py-3 px-8 rounded-lg shadow transition-all duration-300">
              Watch Demo
            </button>
          </div>
          
         
          
          <div className="mt-8 flex flex-col sm:flex-row gap-6">
            <div className="flex items-start">
              <div className="bg-green-100 p-2 rounded-full mr-3">
                <Heart className="h-6 w-6 text-green-600" />
              </div>
              <div>
                <h3 className="font-semibold text-white-500">Health Tracking</h3>
                <p className="text-gray-400">Monitor your vital signs and health metrics</p>
              </div>
            </div>
            
            <div className="flex items-start">
              <div className="bg-blue-100 p-2 rounded-full mr-3">
                <Activity className="h-6 w-6 text-blue-600" />
              </div>
              <div>
                <h3 className="font-semibold text-white-500">Activity Analysis</h3>
                <p className="text-gray-400">Get insights on your daily activities</p>
              </div>
            </div>
          </div>
        </div>
        
        <div className="md:w-1/2 mt-12 md:mt-0">
          <div className="relative">
            <div className="absolute -left-6 -top-6 w-24 h-24 bg-blue-100 rounded-full z-0 animate-pulse"></div>
            <div className="absolute -right-6 -bottom-6 w-32 h-32 bg-green-100 rounded-full z-0 animate-pulse" style={{animationDelay: '1s'}}></div>
            
            <div className="relative z-10 bg-white p-6 rounded-2xl shadow-xl transform transition-all duration-500 hover:scale-[1.02]">
              <div className="flex items-center justify-between mb-8">
                <div className="flex items-center">
                  <div className="bg-blue-600 h-10 w-10 rounded-full flex items-center justify-center">
                    <Trophy className="h-5 w-5 text-white" />
                  </div>
                  <div className="ml-3">
                    <p className="text-sm text-gray-500">Weekly Progress</p>
                    <p className="font-semibold">87% completed</p>
                  </div>
                </div>
                <div className="text-right">
                  <p className="text-sm text-gray-500">Streak</p>
                  <p className="font-semibold">12 days</p>
                </div>
              </div>
              
              <div className="space-y-4 text-gray-500" >
                {[
                  { name: 'Steps', percent: 82, goal: '8,000 steps' },
                  { name: 'Sleep', percent: 75, goal: '8 hours' },
                  { name: 'Hydration', percent: 90, goal: '2L water' },
                  { name: 'Nutrition', percent: 68, goal: '2,100 cal' }
                ].map((metric, index) => (
                  <div key={index} className="bg-gray-50 p-4 rounded-lg">
                    <div className="flex justify-between items-center mb-2">
                      <p className="font-medium">{metric.name}</p>
                      <p className="text-sm text-gray-500">{metric.goal}</p>
                    </div>
                    <div className="h-2 bg-gray-200 rounded-full overflow-hidden">
                      <div 
                        className="h-full bg-blue-600 rounded-full transition-all duration-1000 ease-out"
                        style={{ width: `${metric.percent}%` }}
                      ></div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
      
      <div id="features" className="mt-24 text-center">
        <h2 className="text-3xl font-bold text-gray-300 mb-4">Features You'll Love</h2>
        <p className="text-xl text-gray-400 mb-12 max-w-3xl mx-auto">Everything you need to optimize your health journey in one simple app.</p>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {[
            {
              icon: <Activity className="h-10 w-10 text-blue-600" />,
              title: 'Activity Tracking',
              description: 'Tracks activity and suggests exercises for physical health; assesses mood to offer mental wellness tips.'
            },
            {
              icon: <Bot className="h-10 w-10 text-green-600" />,
              title: 'AI Health Insights',
              description: 'An AI-powered chatbot using RAG provides real-time health advice and empathetic conversation.'
            },
            {
              icon: <Trophy className="h-10 w-10 text-yellow-600" />,
              title: 'Goal Achievement',
              description: 'Set realistic goals, track your progress, and celebrate your achievements.'
            }
          ].map((item, index) => (
            <div key={index} className="bg-white p-6 rounded-xl shadow-md hover:shadow-lg transition-all duration-300 transform hover:scale-105">
              <div className="flex justify-center mb-4">
                {item.icon}
              </div>
              <h3 className="text-xl font-semibold mb-2">{item.title}</h3>
              <p className="text-gray-600">{item.description}</p>
            </div>
          ))}
        </div>
      </div>
      
      <div id="how-it-works" className="mt-24">
        <div className="text-center mb-16">
          <h2 className="text-3xl font-bold text-gray-300 mb-4">How It Works</h2>
          <p className="text-xl text-gray-400 max-w-3xl mx-auto">Getting started with HealthBot is easy. Just follow these simple steps.</p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {[
            {
              step: 1,
              title: 'User Signup & Authentication',
              description: 'Create your account in seconds'
            },
            {
              step: 2,
              title: 'Health Suggestions & Activities',
              description: 'suggests personalized exercises, workouts, and mental health activities'
            },
            {
              step: 3,
              title: 'AI Chatbot Interaction',
              description: 'engages the user with informative, supportive responses'
            },
            {
              step: 4,
              title: 'Get Results',
              description: 'Receive personalized insights'
            }
          ].map((item, index) => (
            <div key={index} className="relative">
              <div className="bg-blue-600 h-14 w-14 rounded-full flex items-center justify-center text-white font-bold text-xl mb-4 mx-auto">
                {item.step}
              </div>
              {index < 3 && (
                <div className="hidden md:block absolute top-7 left-1/2 w-full h-0.5 bg-blue-200"></div>
              )}
              <div className="text-center">
                <h3 className="text-xl font-semibold mb-2">{item.title}</h3>
                <p className="text-gray-500">{item.description}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
      
      <div className="mt-24 bg-blue-50 rounded-2xl p-8 md:p-12 flex flex-col md:flex-row items-center">
        <div className="md:w-2/3 md:pr-8">
          <h2 className="text-3xl font-bold text-gray-800 mb-4">Ready to take control of your health?</h2>
          <p className="text-xl text-gray-600 mb-8">Be among the first to experience a personalized approach to physical and mental well-being.</p>
          <ul className="space-y-3 mb-8 text-gray-500">
            {[
              'Personalized Wellness Plans',
              'Comprehensive Health Tracking',
              'Mental Wellness Support',
              'Seamless Integration & Goal Achievement'
            ].map((feature, index) => (
              <li key={index} className="flex items-center">
                <CheckCircle className="h-5 w-5 text-green-500 mr-2" />
                <span>{feature}</span>
              </li>
            ))}
          </ul>
          <button
            onClick={onGetStarted}
            className="bg-blue-600 hover:bg-blue-700 text-white font-medium py-3 px-8 rounded-lg shadow-lg hover:shadow-xl transition-all duration-300"
          >
            Get Started Free
          </button>
        </div>
        <div className="md:w-1/3 mt-8 md:mt-0">
          <div className="bg-white p-6 rounded-xl shadow-lg">
            <div className="text-center mb-4">
              <p className="text-3xl font-bold text-blue-600">Launching soon — be the first to explore!</p>
            
            </div>
            <div className="border-t border-gray-100 pt-4 mt-4">
              <div className="flex justify-between items-center mb-2">
            
              </div>
      
      
              </div>
            </div>
          </div>
        </div>
      </div>
  
  );
};

export default Hero;