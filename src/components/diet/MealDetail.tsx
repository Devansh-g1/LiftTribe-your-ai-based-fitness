
import React from 'react';
import { X, Heart, Repeat, List, UtensilsCrossed } from 'lucide-react';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogClose } from '@/components/ui/dialog';

interface MealDetailProps {
  isOpen: boolean;
  onClose: () => void;
  meal: {
    id: number;
    type: string;
    name: string;
    imageUrl: string;
    calories: number;
    protein: number;
    carbs: number;
    fat: number;
    ingredients: string[];
    preparation: string[];
  } | null;
}

const MealDetail = ({ isOpen, onClose, meal }: MealDetailProps) => {
  if (!meal) return null;

  const macroTotal = meal.protein + meal.carbs + meal.fat;
  const proteinPercentage = Math.round((meal.protein / macroTotal) * 100);
  const carbsPercentage = Math.round((meal.carbs / macroTotal) * 100);
  const fatPercentage = Math.round((meal.fat / macroTotal) * 100);

  return (
    <Dialog open={isOpen} onOpenChange={(open) => !open && onClose()}>
      <DialogContent className="bg-app-background border-white/10 text-app-text max-w-md mx-auto p-0 overflow-hidden">
        <DialogHeader className="sticky top-0 z-10 bg-app-background/80 backdrop-blur-md">
          <div className="flex justify-between items-center p-4">
            <DialogTitle className="text-xl font-bold">{meal.name}</DialogTitle>
            <DialogClose className="rounded-full bg-white/10 p-1 hover:bg-white/20">
              <X size={18} />
            </DialogClose>
          </div>
        </DialogHeader>
        
        <div className="pb-5">
          <div className="mb-6 h-56 relative">
            <img 
              src={meal.imageUrl} 
              alt={meal.name} 
              className="w-full h-full object-cover"
            />
            <div className="absolute top-4 left-4 py-1 px-3 bg-app-primary/90 rounded-full text-xs font-medium text-white">
              {meal.type}
            </div>
          </div>
          
          <div className="px-4">
            <div className="flex justify-between text-sm mb-2">
              <div className="text-app-text/70">Nutrition</div>
              <div className="font-medium">{meal.calories} kcal</div>
            </div>
            
            <div className="flex justify-between mb-6">
              <div className="flex-1 pr-2">
                <div className="w-full bg-white/10 rounded-full h-3 mb-1">
                  <div 
                    className="bg-app-primary h-full rounded-full"
                    style={{ width: `${proteinPercentage}%` }}
                  />
                </div>
                <div className="flex justify-between text-xs">
                  <span className="text-app-primary">Protein</span>
                  <span>{meal.protein}g</span>
                </div>
              </div>
              
              <div className="flex-1 px-2">
                <div className="w-full bg-white/10 rounded-full h-3 mb-1">
                  <div 
                    className="bg-app-secondary h-full rounded-full"
                    style={{ width: `${carbsPercentage}%` }}
                  />
                </div>
                <div className="flex justify-between text-xs">
                  <span className="text-app-secondary">Carbs</span>
                  <span>{meal.carbs}g</span>
                </div>
              </div>
              
              <div className="flex-1 pl-2">
                <div className="w-full bg-white/10 rounded-full h-3 mb-1">
                  <div 
                    className="bg-app-accent h-full rounded-full"
                    style={{ width: `${fatPercentage}%` }}
                  />
                </div>
                <div className="flex justify-between text-xs">
                  <span className="text-app-accent">Fat</span>
                  <span>{meal.fat}g</span>
                </div>
              </div>
            </div>
            
            <div className="mb-4">
              <h4 className="font-medium mb-2 flex items-center">
                <List size={16} className="mr-2" />
                Ingredients
              </h4>
              <ul className="space-y-1 text-sm text-app-text/90">
                {meal.ingredients.map((ingredient, index) => (
                  <li key={index} className="flex items-center">
                    <span className="w-1.5 h-1.5 rounded-full bg-app-primary mr-2" />
                    {ingredient}
                  </li>
                ))}
              </ul>
            </div>
            
            <div className="mb-6">
              <h4 className="font-medium mb-2 flex items-center">
                <UtensilsCrossed size={16} className="mr-2" />
                Preparation
              </h4>
              <ol className="list-decimal pl-5 space-y-2 text-sm text-app-text/90">
                {meal.preparation.map((step, index) => (
                  <li key={index}>{step}</li>
                ))}
              </ol>
            </div>
            
            <div className="flex gap-3">
              <button className="flex-1 bg-app-secondary rounded-lg py-3 font-medium text-app-background flex items-center justify-center">
                <Repeat size={18} className="mr-2" />
                Swap Meal
              </button>
              <button className="bg-white/10 rounded-lg p-3">
                <Heart size={20} />
              </button>
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default MealDetail;
