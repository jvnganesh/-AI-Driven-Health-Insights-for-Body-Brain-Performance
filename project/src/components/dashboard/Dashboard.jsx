import React, { useState } from 'react';
 import { motion } from "framer-motion";
import { Activity, Brain, Calendar as CalendarIcon, Flame } from 'lucide-react';
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from 'recharts';


const data = [
  { date: 'Mon', physical: 80, mental: 65 },
  { date: 'Tue', physical: 75, mental: 70 },
  { date: 'Wed', physical: 85, mental: 75 },
  { date: 'Thu', physical: 70, mental: 80 },
  { date: 'Fri', physical: 90, mental: 85 },
  { date: 'Sat', physical: 95, mental: 90 },
  { date: 'Sun', physical: 88, mental: 88 },
];


const healthMetrics = [
  {
    title: 'Weekly Progress',
    value: '85%',
    change: '+5%',
    icon: Activity,
    color: 'text-blue-600',
    bgColor: 'bg-blue-100',
  },
  {
    title: 'Mental Wellness',
    value: '78%',
    change: '+3%',
    icon: Brain,
    color: 'text-purple-600',
    bgColor: 'bg-purple-100',
  },
  {
    title: 'Calories Burned',
    value: '2,450',
    change: '+150 kcal',
    icon: Flame,
    color: 'text-orange-600',
    bgColor: 'bg-orange-100',
  },
  {
    title: 'Active Days',
    value: '5/7',
    change: 'This Week',
    icon: CalendarIcon,
    color: 'text-green-600',
    bgColor: 'bg-green-100',
  },
];


const activities = [
  { name: 'Workout', duration: 45, color: '#34D399' },  // green
  { name: 'Yoga', duration: 30, color: '#60A5FA' },     // blue
  { name: 'Meditation', duration: 20, color: '#FBBF24' }, // yellow
  { name: 'Walking', duration: 41, color: '#F87171' },   // red
];


const Dashboard = () => {
  
  const [currentDate, setCurrentDate] = useState(new Date());

  
const handlePrevMonth = () => {
  setCurrentDate((prev) => {
    const prevMonth = new Date(prev.getFullYear(), prev.getMonth() - 1, 1);
    return prevMonth;
  });
};

const handleNextMonth = () => {
  setCurrentDate((prev) => {
    const nextMonth = new Date(prev.getFullYear(), prev.getMonth() + 1, 1);
    return nextMonth;
  });
};

  
  
  const getDaysInMonth = (date) => {
    const year = date.getFullYear();
    const month = date.getMonth();
    return new Date(year, month + 1, 0).getDate();
  };

  const getFirstDayOfMonth = (date) => {
    const year = date.getFullYear();
    const month = date.getMonth();
    return new Date(year, month, 1).getDay();
  };

  const events = [
  { date: "2025-05-05", title: "Meditation Session" },
  { date: "2025-05-12", title: "30-Minute Walk" },
  { date: "2025-05-15", title: "Therapy Appointment" },
];

  const renderCalendar = () => {
    const daysInMonth = getDaysInMonth(currentDate);
    const firstDay = getFirstDayOfMonth(currentDate);
    const days = [];
    const monthNames = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];

    // Add empty cells for days before the first day of the month
    for (let i = 0; i < firstDay; i++) {
      days.push(<div key={`empty-${i}`} className="h-10"></div>);
    }

    // Add cells for each day of the month
    for (let day = 1; day <= daysInMonth; day++) {
      const year = currentDate.getFullYear();
const month = currentDate.getMonth();
const dateStr = `${year}-${(month + 1).toString().padStart(2, '0')}-${day
  .toString()
  .padStart(2, '0')}`;

const hasEvent = events.find((event) => event.date === dateStr);
const today = new Date();
const isToday =
  day === today.getDate() &&
  currentDate.getMonth() === today.getMonth() &&
  currentDate.getFullYear() === today.getFullYear();


days.push(
  <div
    key={day}
    className={`relative h-10 flex items-center justify-center rounded-full cursor-pointer transition-colors ${
      isToday
        ? 'bg-blue-600 text-white'
        : 'hover:bg-gray-100 dark:hover:bg-gray-700'
    } ${hasEvent ? 'bg-yellow-100 dark:bg-yellow-900' : ''}`}
    title={hasEvent?.title}
  >
    {day}
    {hasEvent && (
      <span className="absolute bottom-1 right-1 w-2 h-2 bg-red-500 rounded-full"></span>
    )}
  </div>
);

    }

    return (
      <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm p-6">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-lg font-medium text-gray-900 dark:text-white">
            {monthNames[currentDate.getMonth()]} {currentDate.getFullYear()}
          </h2>
          <div className="flex space-x-2">
           <button
  onClick={handlePrevMonth}
  className="p-2 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-full"
>
  &lt;
</button>
<button
  onClick={handleNextMonth}
  className="p-2 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-full"
>
  &gt;
</button>

          </div>
        </div>
        <div className="grid grid-cols-7 gap-2 mb-2">
          {['S', 'M', 'T', 'W', 'T', 'F', 'S'].map((day) => (
            <div key={day} className="text-center text-gray-500 dark:text-gray-400">
              {day}
            </div>
          ))}
        </div>
        <div className="grid grid-cols-7 gap-2">{days}</div>
      </div>
    );
  };

  

  const renderActivityRing = () => {
  const totalDuration = activities.reduce((sum, activity) => sum + activity.duration, 0);
  let currentOffset = 0;

  return (
    <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm p-6">
      <h2 className="text-lg font-medium text-gray-900 dark:text-white mb-6">
        Today Overview
      </h2>
      <div className="flex items-center justify-between">
        <div className="relative w-52 h-52">
          <svg className="w-full h-full transform -rotate-90 transition-transform duration-500">
            {activities.map((activity, index) => {
              const normalizedDuration = (activity.duration / totalDuration) * 100;
              const strokeDasharray = `${normalizedDuration} ${100 - normalizedDuration}`;
              const strokeDashoffset = -currentOffset;
              currentOffset += normalizedDuration;

              return (
                <circle
                  key={index}
                  cx="50%"
                  cy="50%"
                  r="20"
                  fill="none"
                  stroke={activity.color}
                  strokeWidth="4"
                  strokeDasharray={`${strokeDasharray}`}
                  strokeDashoffset={`${strokeDashoffset}`}
                  style={{
                    transformOrigin: '50% 50%',
                    transform: 'scale(2.5)',
                    transition: 'stroke-dashoffset 1s ease-out, transform 0.5s ease-in-out',
                  }}
                  className="hover:scale-110 hover:opacity-80"
                />
              );
            })}
            <text
              x="50%"
              y="50%"
              textAnchor="middle"
              dy=".3em"
              className="text-xl font-bold"
              fill="currentColor"
            >
              +60%
            </text>
          </svg>
        </div>
        <div className="space-y-4">
          {activities.map((activity, index) => (
            <div key={index} className="flex items-center space-x-2">
              <div
                className="w-3 h-3 rounded-full"
                style={{ backgroundColor: activity.color }}
              />
              <span className="text-sm text-gray-600 dark:text-gray-400">
                {activity.name}
              </span>
              <span className="text-sm font-medium">
                {activity.duration} Minutes
              </span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};


  return (

    
    <div className="space-y-6">

      <div className="mb-6">
    <motion.h1
  initial={{ opacity: 0, y: -20 }}
  animate={{ opacity: 1, y: 0 }}
  transition={{ duration: 0.8, ease: "easeOut" }}
  className="text-5xl font-bold bg-gradient-to-r from-pink-500 via-cyan-400 to-purple-700 text-transparent bg-clip-text drop-shadow-[0_4px_16px_rgba(0,255,255,0.5)] max-w-xs"
>
  Hey,
</motion.h1>



      <motion.p
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.2 }}
        className="text-lg text-gray-700 dark:text-gray-300 mt-2"
      >
        Here is your daily activity and reports
      </motion.p>
      </div>
      
      {/* Health Metrics Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {healthMetrics.map((metric, index) => {
          const Icon = metric.icon;
          return (
            
            <motion.div
              key={index}
              className="bg-white dark:bg-gray-800 rounded-xl shadow-sm p-6"
               whileHover={{
    scale: 1.05,
    boxShadow: '0 4px 20px rgba(0,0,0,0.1)',
    transition: { duration: 0.3 },
  }}
            >
              <div className="flex items-center justify-between">
                <div
                  className={`${metric.bgColor} ${metric.color} p-3 rounded-lg`}
                >
                  <Icon className="h-6 w-6" />
                </div>
                <span
                  className={`text-sm font-medium ${
                    metric.change.includes('+')
                      ? 'text-green-600 dark:text-green-400'
                      : 'text-gray-600 dark:text-gray-400'
                  }`}
                >
                  {metric.change}
                </span>
              </div>
              <h3 className="mt-4 text-lg font-medium text-gray-900 dark:text-white">
                {metric.value}
              </h3>
              <p className="text-sm text-gray-600 dark:text-gray-400">
                {metric.title}
              </p>
            </motion.div>
          );
        })}
      </div>

      
     {/* Health Trends Chart and Image Side by Side */}
<div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm p-6">
  <h2 className="text-lg font-medium text-gray-900 dark:text-white mb-6">
    Health Trends
  </h2>

  <div className="flex flex-row gap-6">
    {/* Chart - Equal width */}
    <div className="flex-[2] h-[400px]">
      <ResponsiveContainer width="100%" height="100%">
        <LineChart data={data}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="date"
            
            />
          <YAxis />
          <Tooltip
            contentStyle={{
              backgroundColor: 'rgba(255, 255, 255, 0.9)',
              border: 'none',
              borderRadius: '8px',
              boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
            }}
             labelStyle={{
        color: '#1d4ed8', // Blue color for the label (day names)
        
      }}
     
          />
          <Legend />
          <Line
            type="monotone"
            dataKey="physical"
            stroke="#ff8c00"
            strokeWidth={2}
            dot={{ fill: '#ff8c00' }}
            name="Physical Health"
          />
          <Line
            type="monotone"
            dataKey="mental"
            stroke="#34d399"
            strokeWidth={2}
            dot={{ fill: '#34d399' }}
            name="Mental Health"
          />
        </LineChart>
      </ResponsiveContainer>
    </div>

    {/* Image - Equal width with animation */}
<div className="flex-1 flex items-center justify-center h-[300px] transition-transform duration-700 ease-in-out animate-fadeIn">
  <img
    src="https://static.wixstatic.com/media/55d1c7_89926982ec17475491aa91e07da9419a~mv2.jpeg/v1/fill/w_640,h_456,al_c,q_80,usm_0.66_1.00_0.01,enc_avif,quality_auto/55d1c7_89926982ec17475491aa91e07da9419a~mv2.jpeg"
    alt="Health Triangle"
    className="max-h-full w-auto rounded-lg shadow-md transform transition-transform duration-500 hover:scale-105"
  />
</div>

  </div>
</div>



      {/* Calendar and Activity Ring */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {renderCalendar()}
        {renderActivityRing()}
      </div>

     
    </div>
  );
};

export default Dashboard;