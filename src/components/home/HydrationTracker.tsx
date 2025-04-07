
import React from 'react';
import { Plus, Droplet } from 'lucide-react';

const HydrationTracker = () => {
  const hydration = {
    current: 1200, // ml
    goal: 2500, // ml
  };

  const percentage = Math.min(Math.round((hydration.current / hydration.goal) * 100), 100);
  
  const addWater = () => {
    // This would be connected to state management in a real app
    console.log("Adding water");
  };

  return (
    <div className="card">
      <div className="flex justify-between mb-3">
        <h3 className="font-bold text-lg">Hydration</h3>
        <button 
          onClick={addWater}
          className="bg-app-primary/20 hover:bg-app-primary/30 text-app-primary rounded-full p-1 transition-colors"
        >
          <Plus size={20} />
        </button>
      </div>
      
      <div className="flex items-center">
        <div className="relative w-20 h-20 mr-4">
          <svg viewBox="0 0 100 100" className="w-full h-full -rotate-90">
            <circle 
              cx="50" cy="50" r="45" 
              fill="none" 
              stroke="#ffffff10" 
              strokeWidth="10"
            />
            <circle 
              cx="50" cy="50" r="45" 
              fill="none" 
              stroke="#00dba8" 
              strokeWidth="10"
              strokeDasharray={`${percentage * 2.83} 283`}
              strokeLinecap="round"
              className="transition-all duration-1000 ease-out"
            />
          </svg>
          <div className="absolute inset-0 flex items-center justify-center flex-col">
            <Droplet size={16} className="text-app-secondary mb-1" fill="#00dba8" />
            <span className="text-sm font-medium">{percentage}%</span>
          </div>
        </div>
        
        <div>
          <div className="mb-1 text-lg font-medium">{hydration.current} ml</div>
          <div className="text-sm text-app-text/70">Goal: {hydration.goal} ml</div>
        </div>
      </div>
    </div>
  );
};

export default HydrationTracker;
