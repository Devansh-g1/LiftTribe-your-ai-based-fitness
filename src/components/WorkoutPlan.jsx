import React from "react";

const WorkoutPlan = ({ userProfile }) => {
  // This is a simplified version - in a real app, you would generate personalized workouts
  // based on the user's profile data using AI or predefined plans

  const getRecommendedWorkouts = () => {
    const { fitnessGoal, activityLevel, gender } = userProfile;
    
    // Simple logic to determine workout intensity based on activity level
    let intensity = "low";
    if (activityLevel === "moderate") intensity = "moderate";
    if (["active", "very_active"].includes(activityLevel)) intensity = "high";
    
    // Simple workout suggestions based on fitness goal
    switch (fitnessGoal) {
      case "weight_loss":
        return [
          { name: "Cardio Circuit Training", duration: "30 min", intensity },
          { name: "HIIT Workout", duration: "20 min", intensity },
          { name: "Full Body Burn", duration: "45 min", intensity },
          { name: "Metabolic Conditioning", duration: "35 min", intensity }
        ];
      case "muscle_gain":
        return [
          { name: "Upper Body Strength", duration: "45 min", intensity },
          { name: "Lower Body Power", duration: "40 min", intensity },
          { name: "Hypertrophy Focus", duration: "50 min", intensity },
          { name: "Progressive Overload Training", duration: "55 min", intensity }
        ];
      case "general_fitness":
        return [
          { name: "Balanced Fitness Routine", duration: "40 min", intensity },
          { name: "Functional Training", duration: "35 min", intensity },
          { name: "Core Stability Workout", duration: "30 min", intensity },
          { name: "Active Recovery Session", duration: "25 min", intensity }
        ];
      case "endurance":
        return [
          { name: "Long Distance Cardio", duration: "60 min", intensity },
          { name: "Interval Endurance Training", duration: "45 min", intensity },
          { name: "Stamina Builder", duration: "50 min", intensity },
          { name: "Endurance Circuit", duration: "40 min", intensity }
        ];
      default:
        return [
          { name: "General Fitness Workout", duration: "30 min", intensity },
          { name: "Beginner Friendly Circuit", duration: "25 min", intensity },
          { name: "Body Weight Basics", duration: "20 min", intensity },
          { name: "Mobility & Stretching", duration: "15 min", intensity }
        ];
    }
  };

  const workouts = getRecommendedWorkouts();

  return (
    <div className="bg-white shadow rounded-lg p-6">
      <h2 className="text-xl font-semibold text-gray-900 mb-4">Your Personalized Workout Plan</h2>
      <div className="space-y-4">
        {workouts.map((workout, index) => (
          <div key={index} className="border-l-4 border-indigo-500 pl-4 py-2">
            <h3 className="font-medium text-gray-900">{workout.name}</h3>
            <p className="text-sm text-gray-600">
              Duration: {workout.duration} • Intensity: {workout.intensity}
            </p>
            <button className="mt-2 text-sm text-indigo-600 hover:text-indigo-800 font-medium">
              View Details
            </button>
          </div>
        ))}
      </div>
      <button className="mt-6 w-full py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">
        Generate New Workout Plan
      </button>
    </div>
  );
};

export default WorkoutPlan;