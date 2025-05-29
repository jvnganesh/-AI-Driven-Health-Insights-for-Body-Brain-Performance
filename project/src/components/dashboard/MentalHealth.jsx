import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Brain, Moon, Sun, Activity, Coffee, Smile, AlertTriangle } from 'lucide-react';
import { getHealthPredictions } from '../../services/healthPrediction';

const MentalHealth = () => {
  const [formData, setFormData] = useState({
    Age: 25,
    "Sleep Hours": 7,
    "Work Hours per Week": 40,
    "Screen Time per Day (Hours)": 6,
    "Social Interaction Score": 7,
    "Happiness Score": 8,
    Gender: "Male",
    "Exercise Level": "Moderate",
    "Diet Type": "Balanced",
    "Stress Level": "Low"
  });

  const [predictions, setPredictions] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: name === "Age" || name.includes("Hours") || name.includes("Score") ? 
        Number(value) : value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    try {
      const result = await getHealthPredictions(formData);
      setPredictions(result);
    } catch (err) {
      setError('Failed to get predictions. Please try again.');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="space-y-6">
      <div className="bg-gradient-to-r from-purple-600 to-blue-600 rounded-xl p-8 text-white">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <h1 className="text-3xl font-bold mb-4">Mental Health Assessment</h1>
          <p className="text-xl opacity-90">Take care of your mind, and your mind will take care of you.</p>
        </motion.div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-white dark:bg-gray-800 rounded-xl p-6">
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">Health Assessment Form</h2>
          
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                  Age
                </label>
                <input
                  type="number"
                  name="Age"
                  value={formData.Age}
                  onChange={handleInputChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 dark:bg-gray-700 dark:border-gray-600"
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                  Sleep Hours
                </label>
                <input
                  type="number"
                  name="Sleep Hours"
                  value={formData["Sleep Hours"]}
                  onChange={handleInputChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 dark:bg-gray-700 dark:border-gray-600"
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                  Work Hours per Week
                </label>
                <input
                  type="number"
                  name="Work Hours per Week"
                  value={formData["Work Hours per Week"]}
                  onChange={handleInputChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 dark:bg-gray-700 dark:border-gray-600"
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                  Screen Time per Day (Hours)
                </label>
                <input
                  type="number"
                  name="Screen Time per Day (Hours)"
                  value={formData["Screen Time per Day (Hours)"]}
                  onChange={handleInputChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 dark:bg-gray-700 dark:border-gray-600"
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                  Social Interaction Score (1-10)
                </label>
                <input
                  type="number"
                  name="Social Interaction Score"
                  value={formData["Social Interaction Score"]}
                  onChange={handleInputChange}
                  min="1"
                  max="10"
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 dark:bg-gray-700 dark:border-gray-600"
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                  Happiness Score (1-10)
                </label>
                <input
                  type="number"
                  name="Happiness Score"
                  value={formData["Happiness Score"]}
                  onChange={handleInputChange}
                  min="1"
                  max="10"
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 dark:bg-gray-700 dark:border-gray-600"
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                  Gender
                </label>
                <select
                  name="Gender"
                  value={formData.Gender}
                  onChange={handleInputChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 dark:bg-gray-700 dark:border-gray-600"
                  required
                >
                  <option value="Male">Male</option>
                  <option value="Female">Female</option>
                  <option value="Other">Other</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                  Exercise Level
                </label>
                <select
                  name="Exercise Level"
                  value={formData["Exercise Level"]}
                  onChange={handleInputChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 dark:bg-gray-700 dark:border-gray-600"
                  required
                >
                  <option value="Low">Low</option>
                  <option value="Moderate">Moderate</option>
                  <option value="Strong">Strong</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                  Diet Type
                </label>
                <select
                  name="Diet Type"
                  value={formData["Diet Type"]}
                  onChange={handleInputChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 dark:bg-gray-700 dark:border-gray-600"
                  required
                >
                  <option value="Balanced">Balanced</option>
                  <option value="Vegetarian">Vegetarian</option>
                  <option value="Vegan">Vegan</option>
                  <option value="Keto">Keto</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                  Stress Level
                </label>
                <select
                  name="Stress Level"
                  value={formData["Stress Level"]}
                  onChange={handleInputChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 dark:bg-gray-700 dark:border-gray-600"
                  required
                >
                  <option value="Low">Low</option>
                  <option value="Medium">Medium</option>
                  <option value="High">High</option>
                </select>
              </div>
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full mt-6 bg-purple-600 text-white py-2 px-4 rounded-lg hover:bg-purple-700 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:ring-offset-2 transition-colors disabled:opacity-50"
            >
              {loading ? 'Analyzing...' : 'Get Assessment'}
            </button>
          </form>

          {error && (
            <div className="mt-4 p-4 bg-red-50 text-red-600 rounded-lg flex items-center">
              <AlertTriangle className="h-5 w-5 mr-2" />
              {error}
            </div>
          )}
        </div>

        {predictions && (
          <div className="space-y-6">
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              className="bg-white dark:bg-gray-800 rounded-xl p-6"
            >
              <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">Assessment Results</h2>
              
              <div className="space-y-6">
                <div className={`p-4 rounded-lg ${
                  predictions.mentalHealth.risk > 0.5 
                    ? 'bg-red-50 dark:bg-red-900/50 text-red-700 dark:text-red-200'
                    : 'bg-green-50 dark:bg-green-900/50 text-green-700 dark:text-green-200'
                }`}>
                  <div className="flex items-center">
                    <Brain className="h-5 w-5 mr-2" />
                    <h3 className="font-semibold">Mental Health Status</h3>
                  </div>
                  <p className="mt-2">{predictions.mentalHealth.message}</p>
                </div>

                <div>
                  <h3 className="font-semibold text-gray-900 dark:text-white mb-3">Recommended Exercises</h3>
                  <ul className="space-y-2">
                    {predictions.recommendations.exercises.map((exercise, index) => (
                      <li key={index} className="flex items-center text-gray-700 dark:text-gray-300">
                        <Activity className="h-4 w-4 mr-2 text-purple-500" />
                        {exercise}
                      </li>
                    ))}
                  </ul>
                </div>

                <div>
                  <h3 className="font-semibold text-gray-900 dark:text-white mb-3">Recommended Equipment</h3>
                  <ul className="space-y-2">
                    {predictions.recommendations.equipment.map((item, index) => (
                      <li key={index} className="flex items-center text-gray-700 dark:text-gray-300">
                        <Coffee className="h-4 w-4 mr-2 text-blue-500" />
                        {item}
                      </li>
                    ))}
                  </ul>
                </div>

                <div>
                  <h3 className="font-semibold text-gray-900 dark:text-white mb-3">Dietary Recommendations</h3>
                  <div className="space-y-4">
                    <div>
                      <h4 className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Recommended Meals</h4>
                      <ul className="space-y-2">
                        {predictions.recommendations.diet.meals.map((meal, index) => (
                          <li key={index} className="flex items-center text-gray-700 dark:text-gray-300">
                            <Sun className="h-4 w-4 mr-2 text-yellow-500" />
                            {meal}
                          </li>
                        ))}
                      </ul>
                    </div>

                    <div>
                      <h4 className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Supplements</h4>
                      <ul className="space-y-2">
                        {predictions.recommendations.diet.supplements.map((supplement, index) => (
                          <li key={index} className="flex items-center text-gray-700 dark:text-gray-300">
                            <Moon className="h-4 w-4 mr-2 text-indigo-500" />
                            {supplement}
                          </li>
                        ))}
                      </ul>
                    </div>

                    <div className="flex items-center text-gray-700 dark:text-gray-300">
                      <Smile className="h-4 w-4 mr-2 text-green-500" />
                      {predictions.recommendations.diet.hydration}
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        )}
      </div>
    </div>
  );
};

export default MentalHealth;