import React from "react";

const NutritionPlan = ({ userProfile }) => {
  // This is a simplified version - in a real app, you would generate personalized nutrition plans
  // based on the user's profile data using AI or predefined plans

  const getDailyCalories = () => {
    const { gender, weight, height, age, activityLevel } = userProfile;
    
    // Basic BMR calculation using Mifflin-St Jeor Equation
    let bmr;
    if (gender === "male") {
      bmr = 10 * weight + 6.25 * height - 5 * age + 5;
    } else {
      bmr = 10 * weight + 6.25 * height - 5 * age - 161;
    }
    
    // Activity level multiplier
    const activityMultipliers = {
      sedentary: 1.2,
      light: 1.375,
      moderate: 1.55,
      active: 1.725,
      very_active: 1.9
    };
    
    const tdee = Math.round(bmr * (activityMultipliers[activityLevel] || 1.2));
    
    // Adjust based on fitness goal
    switch (userProfile.fitnessGoal) {
      case "weight_loss":
        return Math.round(tdee * 0.8); // 20% deficit
      case "muscle_gain":
        return Math.round(tdee * 1.1); // 10% surplus
      default:
        return tdee; // maintenance calories
    }
  };

  const getDietaryRecommendations = () => {
    const { dietaryPreference, fitnessGoal } = userProfile;
    
    // Basic macro splits based on goals
    let proteinPercentage, carbPercentage, fatPercentage;
    
    if (fitnessGoal === "muscle_gain") {
      proteinPercentage = 30;
      carbPercentage = 45;
      fatPercentage = 25;
    } else if (fitnessGoal === "weight_loss") {
      proteinPercentage = 35;
      carbPercentage = 35;
      fatPercentage = 30;
    } else {
      proteinPercentage = 25;
      carbPercentage = 50;
      fatPercentage = 25;
    }
    
    // Adjust for dietary preferences
    if (dietaryPreference === "vegetarian" || dietaryPreference === "vegan") {
      proteinPercentage -= 5;
      carbPercentage += 5;
    } else if (dietaryPreference === "keto") {
      carbPercentage = 5;
      fatPercentage = 70;
      proteinPercentage = 25;
    } else if (dietaryPreference === "paleo") {
      carbPercentage = 25;
      proteinPercentage = 35;
      fatPercentage = 40;
    }
    
    return {
      proteinPercentage,
      carbPercentage,
      fatPercentage
    };
  };

  const dailyCalories = getDailyCalories();
  const { proteinPercentage, carbPercentage, fatPercentage } = getDietaryRecommendations();
  
  // Calculate macros in grams
  const proteinGrams = Math.round((dailyCalories * (proteinPercentage / 100)) / 4);
  const carbGrams = Math.round((dailyCalories * (carbPercentage / 100)) / 4);
  const fatGrams = Math.round((dailyCalories * (fatPercentage / 100)) / 9);

  return (
    <div className="bg-white shadow rounded-lg p-6">
      <h2 className="text-xl font-semibold text-gray-900 mb-4">Your Nutrition Plan</h2>
      
      <div className="mb-6">
        <h3 className="font-medium text-gray-900 mb-2">Daily Calorie Target</h3>
        <div className="text-3xl font-bold text-indigo-600">{dailyCalories} kcal</div>
      </div>
      
      <div className="space-y-4">
        <h3 className="font-medium text-gray-900">Macronutrient Breakdown</h3>
        
        <div className="grid grid-cols-3 gap-4">
          <div className="bg-blue-50 p-3 rounded-lg text-center">
            <span className="block text-sm text-gray-500">Protein</span>
            <span className="text-xl font-semibold text-gray-900">{proteinGrams}g</span>
            <span className="block text-xs text-gray-500">{proteinPercentage}%</span>
          </div>
          
          <div className="bg-green-50 p-3 rounded-lg text-center">
            <span className="block text-sm text-gray-500">Carbs</span>
            <span className="text-xl font-semibold text-gray-900">{carbGrams}g</span>
            <span className="block text-xs text-gray-500">{carbPercentage}%</span>
          </div>
          
          <div className="bg-yellow-50 p-3 rounded-lg text-center">
            <span className="block text-sm text-gray-500">Fat</span>
            <span className="text-xl font-semibold text-gray-900">{fatGrams}g</span>
            <span className="block text-xs text-gray-500">{fatPercentage}%</span>
          </div>
        </div>
      </div>
      
      <button className="mt-6 w-full py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">
        Get Detailed Meal Plan
      </button>
    </div>
  );
};

export default NutritionPlan;