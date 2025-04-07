
import React from 'react';
import { Clock, ActivitySquare } from 'lucide-react';

interface WorkoutSummaryProps {
  type: string;
  duration: number;
  intensity: string;
}

const WorkoutSummary = ({ type, duration, intensity }: WorkoutSummaryProps) => {
  return (
    <div className="bg-app-primary/10 rounded-xl p-4 mb-5">
      <h3 className="text-xl font-bold mb-2">{type}</h3>
      <div className="flex items-center text-app-text/70">
        <div className="flex items-center mr-4">
          <Clock size={16} className="mr-1" />
          <span>{duration} min</span>
        </div>
        <div className="flex items-center">
          <ActivitySquare size={16} className="mr-1" />
          <span>{intensity}</span>
        </div>
      </div>
    </div>
  );
};

export default WorkoutSummary;
