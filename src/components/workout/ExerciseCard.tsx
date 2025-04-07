
import React from 'react';
import { CheckCircle, Dumbbell } from 'lucide-react';

interface ExerciseCardProps {
  exercise: {
    id: number;
    name: string;
    equipment: 'bodyweight' | 'dumbbell' | 'band';
    imageUrl: string;
    reps: number;
    sets: number;
    completed: boolean;
  };
  onToggleComplete: (id: number) => void;
  onClick: (id: number) => void;
}

const ExerciseCard = ({ exercise, onToggleComplete, onClick }: ExerciseCardProps) => {
  const getEquipmentIcon = () => {
    switch (exercise.equipment) {
      case 'dumbbell':
        return <Dumbbell size={16} />;
      case 'band':
        return <span className="text-xs">BAND</span>;
      default:
        return <span className="text-xs">BW</span>;
    }
  };

  return (
    <div 
      className={`card flex items-center p-3 ${exercise.completed ? 'border-app-secondary/30' : ''}`}
      onClick={() => onClick(exercise.id)}
    >
      <div className="w-16 h-16 bg-white/10 rounded-lg overflow-hidden mr-3 flex-shrink-0">
        <img 
          src={exercise.imageUrl} 
          alt={exercise.name} 
          className="w-full h-full object-cover"
        />
      </div>
      
      <div className="flex-1">
        <h4 className="font-medium">{exercise.name}</h4>
        <div className="flex items-center text-sm text-app-text/70 mt-1">
          <div className="bg-white/10 rounded-full py-0.5 px-2 flex items-center mr-2">
            {getEquipmentIcon()}
          </div>
          <span>{exercise.reps} reps × {exercise.sets} sets</span>
        </div>
      </div>
      
      <button 
        className="ml-2 p-1" 
        onClick={(e) => {
          e.stopPropagation();
          onToggleComplete(exercise.id);
        }}
      >
        <CheckCircle 
          size={24} 
          className={`transition-colors ${
            exercise.completed ? 'text-app-secondary' : 'text-white/20'
          }`} 
          fill={exercise.completed ? '#00dba8' : 'transparent'} 
        />
      </button>
    </div>
  );
};

export default ExerciseCard;
