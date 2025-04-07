
import React from 'react';
import { ArrowRight, Repeat } from 'lucide-react';

interface MealCardProps {
  meal: {
    id: number;
    type: string;
    name: string;
    imageUrl: string;
    calories: number;
    protein: number;
    carbs: number;
    fat: number;
  };
  onClick: (id: number) => void;
}

const MealCard = ({ meal, onClick }: MealCardProps) => {
  return (
    <div className="card" onClick={() => onClick(meal.id)}>
      <div className="flex justify-between items-center mb-3">
        <div className="py-1 px-3 bg-app-primary/20 rounded-full text-xs font-medium text-app-primary">
          {meal.type}
        </div>
        <button className="text-app-text/60 hover:text-app-text">
          <Repeat size={18} />
        </button>
      </div>
      
      <div className="flex">
        <div className="w-20 h-20 rounded-lg overflow-hidden mr-4 flex-shrink-0">
          <img 
            src={meal.imageUrl} 
            alt={meal.name} 
            className="w-full h-full object-cover"
          />
        </div>
        
        <div className="flex-1">
          <h4 className="font-medium mb-2">{meal.name}</h4>
          
          <div className="flex items-center justify-between mb-1">
            <span className="text-xs text-app-text/70">Calories</span>
            <span className="text-xs font-medium">{meal.calories} kcal</span>
          </div>
          
          <div className="w-full h-1.5 bg-white/10 rounded-full flex overflow-hidden">
            <div 
              className="h-full bg-app-primary" 
              style={{ width: `${meal.protein * 100 / (meal.protein + meal.carbs + meal.fat)}%` }}
            />
            <div 
              className="h-full bg-app-secondary" 
              style={{ width: `${meal.carbs * 100 / (meal.protein + meal.carbs + meal.fat)}%` }}
            />
            <div 
              className="h-full bg-app-accent" 
              style={{ width: `${meal.fat * 100 / (meal.protein + meal.carbs + meal.fat)}%` }}
            />
          </div>
          
          <div className="flex text-xs mt-1 text-app-text/70">
            <span className="mr-2">P: {meal.protein}g</span>
            <span className="mr-2">C: {meal.carbs}g</span>
            <span>F: {meal.fat}g</span>
          </div>
        </div>
        
        <button className="self-center ml-1 text-app-text/60">
          <ArrowRight size={18} />
        </button>
      </div>
    </div>
  );
};

export default MealCard;
