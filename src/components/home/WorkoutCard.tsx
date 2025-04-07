
import React from 'react';
import { Play, Clock } from 'lucide-react';

const WorkoutCard = () => {
  const workout = {
    title: "Upper Body Strength",
    duration: 45,
    difficulty: "Intermediate",
    completedSets: 2,
    totalSets: 5,
  };

  const progressPercentage = (workout.completedSets / workout.totalSets) * 100;

  return (
    <div className="card">
      <div className="flex justify-between items-start mb-3">
        <div>
          <h3 className="font-bold text-lg">{workout.title}</h3>
          <div className="flex items-center text-sm text-app-text/70 mt-1">
            <Clock size={14} className="mr-1" />
            <span>{workout.duration} min</span>
            <span className="mx-2">•</span>
            <span>{workout.difficulty}</span>
          </div>
        </div>
        <button className="bg-app-primary rounded-full p-3 hover:bg-opacity-80 transition-all">
          <Play size={18} fill="#ffffff" />
        </button>
      </div>
      
      <div className="mt-4">
        <div className="flex justify-between text-sm mb-1">
          <span>Progress</span>
          <span>{workout.completedSets}/{workout.totalSets} sets completed</span>
        </div>
        <div className="w-full bg-white/10 rounded-full h-2">
          <div 
            className="bg-app-secondary rounded-full h-2 transition-all duration-500 ease-out"
            style={{ width: `${progressPercentage}%` }}
          />
        </div>
      </div>
    </div>
  );
};

export default WorkoutCard;
