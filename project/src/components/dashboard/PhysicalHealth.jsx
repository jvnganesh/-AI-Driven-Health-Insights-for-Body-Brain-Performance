import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Activity, User, Scale, Dumbbell, Heart, Moon, Droplets, UserCircle, CheckCircle, X } from 'lucide-react';
import { supabase } from '../../lib/supabase';

const PhysicalHealth = () => {
  const [showNewUserForm, setShowNewUserForm] = useState(false);
  const [selectedUser, setSelectedUser] = useState(null);
  const [users, setUsers] = useState([]);
  const [formData, setFormData] = useState({
    name: '',
    age: '',
    gender: '',
    height: '',
    weight: '',
    bodyType: '',
    healthGoal: '',
    activityLevel: ''
  });
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState('');
  const [selectedWorkout, setSelectedWorkout] = useState(null);

  const workouts = {
    'Push-ups': {
      type: 'video',
      url: 'https://media.istockphoto.com/id/1494234498/video/3d-rendered-animation-of-a-person-doing-the-push-ups-on-the-empty-background.mp4?s=mp4-640x640-is&k=20&c=k1Lk5ich2L5ZE_sE6BVQi1yDXP5yWH8cJBX6j6nvx_E='
    },
    'barbell-bulgarian-split-squat': {
      type: 'video',
      url: 'https://www.shutterstock.com/shutterstock/videos/1100873171/preview/stock-footage-barbell-bulgarian-split-squat-fitness-exercise-workout-animation-male-muscle-highlight.webm'
    },
    'Plank': {
      type: 'video',
      url: 'https://www.shutterstock.com/shutterstock/videos/1107056153/preview/stock-footage-plank-d-no-background-with-alpha-channel-with-dimensional-shadow-can-be-customized-if.webm'
    }
  };

  const [dailyChecklist, setDailyChecklist] = useState({
    waterIntake: false,
    sleepHours: false,
    dailySteps: false,
    workoutDone: false
  });

  useEffect(() => {
    fetchUsers();
  }, []);

  const fetchUsers = async () => {
    try {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) throw new Error('No user found');

      const { data, error } = await supabase
        .from('user_health_data')
        .select('*')
        .eq('user_id', user.id);

      if (error) throw error;

      setUsers(data || []);
    } catch (error) {
      console.error('Error fetching users:', error);
      setError('Failed to load users');
    } finally {
      setIsLoading(false);
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleChecklistChange = (name) => {
    setDailyChecklist(prev => ({
      ...prev,
      [name]: !prev[name]
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null);
    setSuccess('');
    setIsLoading(true);

    try {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) throw new Error('No user found');

      const newUser = {
        user_id: user.id,
        ...formData,
      };

      const { data, error } = await supabase
        .from('user_health_data')
        .insert([newUser])
        .select()
        .single();

      if (error) throw error;

      setUsers(prev => [...prev, data]);
      setSelectedUser(data);
      setShowNewUserForm(false);
      setSuccess('Profile created successfully!');
      
      setFormData({
        name: '',
        age: '',
        gender: '',
        height: '',
        weight: '',
        bodyType: '',
        healthGoal: '',
        activityLevel: ''
      });
    } catch (err) {
      console.error('Error creating user:', err);
      setError(err.message);
    } finally {
      setIsLoading(false);
    }
  };

  const calculateBMI = (weight, height) => {
    const heightInMeters = height / 100;
    return (weight / (heightInMeters * heightInMeters)).toFixed(1);
  };

  const getBMIStatus = (bmi) => {
    if (bmi < 18.5) return { status: 'Underweight', color: 'text-blue-500' };
    if (bmi < 25) return { status: 'Healthy', color: 'text-green-500' };
    if (bmi < 30) return { status: 'Overweight', color: 'text-yellow-500' };
    return { status: 'Obese', color: 'text-red-500' };
  };

  const WorkoutModal = ({ workout, onClose }) => {
  const [timer, setTimer] = useState(30);

  useEffect(() => {
    if (workout === 'Plank' && timer > 0) {
      const countdown = setTimeout(() => setTimer(timer - 1), 1000);
      return () => clearTimeout(countdown);
    }
  }, [timer, workout]);

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4"
    >
      <motion.div
        initial={{ scale: 0.9, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        exit={{ scale: 0.9, opacity: 0 }}
        className="bg-white dark:bg-gray-800 rounded-xl p-6 max-w-lg w-full relative"
      >
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200"
        >
          <X className="h-6 w-6" />
        </button>

        <h3 className="text-2xl font-bold mb-4 text-gray-900 dark:text-white">{workout}</h3>
        
        <div className="relative pt-[56.25%]">
          {workouts[workout].type === 'video' ? (
            <video
              src={workouts[workout].url}
              autoPlay
              loop
              muted
              playsInline
              className="absolute top-0 left-0 w-full h-full object-contain rounded-lg"
            />
          ) : (
            <img
              src={workouts[workout].url}
              alt={`${workout} demonstration`}
              className="absolute top-0 left-0 w-full h-full object-contain rounded-lg"
            />
          )}

          {workout === 'Plank' && (
            <div className="absolute bottom-2 right-3 bg-black/60 text-white text-sm px-3 py-1 rounded-md font-mono">
              {timer}s
            </div>
          )}
        </div>

        <div className="mt-4 text-center">
          <p className="text-gray-600 dark:text-gray-300">Follow along with the demonstration</p>
        </div>
      </motion.div>
    </motion.div>
  );
};


  if (isLoading && !showNewUserForm) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="bg-gradient-to-r from-blue-600 to-purple-600 rounded-xl p-8 text-white">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <h1 className="text-3xl font-bold mb-4">Track Your Physical Health Journey</h1>
          <p className="text-xl opacity-90">Your body is your most priceless possession. Take care of it.</p>
          <button
            onClick={() => setShowNewUserForm(true)}
            className="mt-6 bg-white text-blue-600 px-6 py-3 rounded-lg font-semibold hover:bg-opacity-90 transition-colors"
          >
            Start Your Fitness Journey
          </button>
        </motion.div>
      </div>

      {error && (
        <div className="bg-red-50 border border-red-200 text-red-600 px-4 py-3 rounded-lg">
          {error}
        </div>
      )}

      {success && (
        <div className="bg-green-50 border border-green-200 text-green-600 px-4 py-3 rounded-lg flex items-center">
          <CheckCircle className="h-5 w-5 mr-2" />
          {success}
        </div>
      )}

      {users.length > 0 && (
        <div className="bg-white dark:bg-gray-800 rounded-xl p-6">
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">Existing Users</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {users.map(user => (
              <motion.div
                key={user.id}
                whileHover={{ scale: 1.02 }}
                className={`p-4 rounded-lg cursor-pointer ${
                  selectedUser?.id === user.id 
                    ? 'bg-blue-50 dark:bg-blue-900/50 border-2 border-blue-500'
                    : 'bg-gray-50 dark:bg-gray-700'
                }`}
                onClick={() => setSelectedUser(user)}
              >
                <div className="flex items-center space-x-3">
                  <div className="bg-blue-100 dark:bg-blue-900 p-2 rounded-full">
                    <UserCircle className="h-6 w-6 text-blue-600 dark:text-blue-400" />
                  </div>
                  <div>
                    <h3 className="font-medium text-gray-900 dark:text-white">{user.name}</h3>
                    <div className="flex items-center space-x-2">
                      <span className="text-sm text-gray-500 dark:text-gray-400">
                        BMI: {calculateBMI(user.weight, user.height)}
                      </span>
                      <span className={`text-sm ${getBMIStatus(calculateBMI(user.weight, user.height)).color}`}>
                        ({getBMIStatus(calculateBMI(user.weight, user.height)).status})
                      </span>
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      )}

      {selectedUser && (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {[
            { title: 'Daily Steps', value: '8,432', icon: Activity, color: 'blue' },
            { title: 'Active Minutes', value: '45', icon: Heart, color: 'red' },
            { title: 'Water Intake', value: '1.8L', icon: Droplets, color: 'cyan' },
            { title: 'Sleep Hours', value: '7.5', icon: Moon, color: 'purple' }
          ].map((stat, index) => (
            <motion.div
              key={index}
              whileHover={{ scale: 1.02 }}
              className={`bg-white dark:bg-gray-800 p-6 rounded-xl shadow-sm`}
            >
              <div className="flex items-center space-x-4">
                <div className={`bg-${stat.color}-100 dark:bg-${stat.color}-900 p-3 rounded-lg`}>
                  <stat.icon className={`h-6 w-6 text-${stat.color}-600 dark:text-${stat.color}-400`} />
                </div>
                <div>
                  <p className="text-sm text-gray-600 dark:text-gray-400">{stat.title}</p>
                  <p className="text-xl font-semibold text-gray-900 dark:text-white">{stat.value}</p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      )}

      {selectedUser && (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2 space-y-6">
            <div className="bg-white dark:bg-gray-800 rounded-xl p-6">
              <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">Health Overview</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <p className="text-gray-600 dark:text-gray-400">BMI Score</p>
                  <div className="flex items-end space-x-2">
                    <span className="text-4xl font-bold text-gray-900 dark:text-white">
                      {calculateBMI(selectedUser.weight, selectedUser.height)}
                    </span>
                    <span className={getBMIStatus(calculateBMI(selectedUser.weight, selectedUser.height)).color}>
                      {getBMIStatus(calculateBMI(selectedUser.weight, selectedUser.height)).status}
                    </span>
                  </div>
                </div>
                <div className="space-y-2">
                  <p className="text-gray-600 dark:text-gray-400">Activity Level</p>
                  <div className="flex items-end space-x-2">
                    <span className="text-xl font-bold text-gray-900 dark:text-white capitalize">
                      {selectedUser.activityLevel}
                    </span>
                  </div>
                </div>
              </div>
            </div>

            <div className="bg-white dark:bg-gray-800 rounded-xl p-6">
              <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">Daily Checklist</h2>
              <div className="space-y-4">
                {Object.entries(dailyChecklist).map(([key, checked]) => (
                  <div key={key} className="flex items-center">
                    <input
                      type="checkbox"
                      checked={checked}
                      onChange={() => handleChecklistChange(key)}
                      className="h-5 w-5 text-blue-600 rounded border-gray-300 focus:ring-blue-500"
                    />
                    <label className="ml-3 text-gray-700 dark:text-gray-300 capitalize">
                      {key.replace(/([A-Z])/g, ' $1').trim()}
                    </label>
                  </div>
                ))}
              </div>
            </div>
          </div>

          <div className="bg-white dark:bg-gray-800 rounded-xl p-6">
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">Today's Workout</h2>
            <div className="space-y-6">
              {Object.keys(workouts).map((workout, index) => (
                <div key={index} className="flex items-center space-x-4 p-4 bg-gray-50 dark:bg-gray-700 rounded-lg">
                  <div className="bg-blue-100 dark:bg-blue-900 p-2 rounded-lg">
                    <Dumbbell className="h-5 w-5 text-blue-600 dark:text-blue-400" />
                  </div>
                  <div className="flex-1">
                    <h3 className="font-medium text-gray-900 dark:text-white">{workout}</h3>
                    <p className="text-sm text-gray-500 dark:text-gray-400">
                      3 sets × {workout === 'Plank' ? '30 sec' : '12 reps'}
                    </p>
                  </div>
                  <button
                    onClick={() => setSelectedWorkout(workout)}
                    className="text-blue-600 hover:text-blue-700 dark:text-blue-400 dark:hover:text-blue-300"
                  >
                    Start
                  </button>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {showNewUserForm && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50"
        >
          <motion.div
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            className="bg-white dark:bg-gray-800 rounded-xl p-6 max-w-md w-full mx-4"
          >
            <h2 className="text-2xl font-bold mb-6 text-gray-900 dark:text-white">Create Your Profile</h2>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                  Name
                </label>
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleInputChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:border-gray-600"
                  required
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                    Age
                  </label>
                  <input
                    type="number"
                    name="age"
                    value={formData.age}
                    onChange={handleInputChange}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:border-gray-600"
                    required
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                    Gender
                  </label>
                  <select
                    name="gender"
                    value={formData.gender}
                    onChange={handleInputChange}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:border-gray-600"
                    required
                  >
                    <option value="">Select</option>
                    <option value="male">Male</option>
                    <option value="female">Female</option>
                    <option value="other">Other</option>
                  </select>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                    Height (cm)
                  </label>
                  <input
                    type="number"
                    name="height"
                    value={formData.height}
                    onChange={handleInputChange}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:border-gray-600"
                    required
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                    Weight (kg)
                  </label>
                  <input
                    type="number"
                    name="weight"
                    value={formData.weight}
                    onChange={handleInputChange}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:border-gray-600"
                    required
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                  Body Type
                </label>
                <select
                  name="bodyType"
                  value={formData.bodyType}
                  onChange={handleInputChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:border-gray-600"
                  required
                >
                  <option value="">Select</option>
                  <option value="ectomorph">Ectomorph</option>
                  <option value="mesomorph">Mesomorph</option>
                  <option value="endomorph">Endomorph</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                  Health Goal
                </label>
                <select
                  name="healthGoal"
                  value={formData.healthGoal}
                  onChange={handleInputChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:border-gray-600"
                  required
                >
                  <option value="">Select</option>
                  <option value="weightLoss">Weight Loss</option>
                  <option value="muscleGain">Muscle Gain</option>
                  <option value="maintenance">Maintenance</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                  Activity Level
                </label>
                <select
                  name="activityLevel"
                  value={formData.activityLevel}
                  onChange={handleInputChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:border-gray-600"
                  required
                >
                  <option value="">Select</option>
                  <option value="sedentary">Sedentary</option>
                  <option value="light">Light</option>
                  <option value="active">Active</option>
                  <option value="veryActive">Very Active</option>
                </select>
              </div>

              <div className="flex justify-end space-x-4 mt-6">
                <button
                  type="button"
                  onClick={() => setShowNewUserForm(false)}
                  className="px-4 py-2 text-gray-600 hover:text-gray-800 dark:text-gray-300 dark:hover:text-white"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={isLoading}
                  className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors disabled:opacity-50"
                >
                  {isLoading ? 'Saving...' : 'Save Profile'}
                </button>
              </div>
            </form>
          </motion.div>
        </motion.div>
      )}

      <AnimatePresence>
        {selectedWorkout && (
          <WorkoutModal
            workout={selectedWorkout}
            onClose={() => setSelectedWorkout(null)}
          />
        )}
      </AnimatePresence>
    </div>
  );
};

export default PhysicalHealth;