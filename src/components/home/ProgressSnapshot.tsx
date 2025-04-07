
import React from 'react';
import { Flame, Award } from 'lucide-react';

const ProgressSnapshot = () => {
  return (
    <div className="card">
      <h3 className="font-bold text-lg mb-3">Daily Progress</h3>
      
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center">
          <div className="w-10 h-10 bg-app-accent/20 rounded-full flex items-center justify-center mr-3">
            <Flame size={20} className="text-app-accent" />
          </div>
          <div>
            <div className="text-sm text-app-text/70">Calories Burned</div>
            <div className="font-medium">320 / 500 kcal</div>
          </div>
        </div>
        
        <div className="flex items-center">
          <div className="w-10 h-10 bg-app-primary/20 rounded-full flex items-center justify-center mr-3">
            <Award size={20} className="text-app-primary" />
          </div>
          <div>
            <div className="text-sm text-app-text/70">Current Streak</div>
            <div className="font-medium">3 days</div>
          </div>
        </div>
      </div>
      
      <div className="bg-white/5 rounded-lg p-3 italic text-center text-sm">
        "The only bad workout is the one that didn't happen."
      </div>
    </div>
  );
};

export default ProgressSnapshot;
