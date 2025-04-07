
import React from 'react';
import { X, Heart, Clock, Info } from 'lucide-react';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogClose } from '@/components/ui/dialog';

interface ExerciseDetailProps {
  isOpen: boolean;
  onClose: () => void;
  exercise: {
    id: number;
    name: string;
    imageUrl: string;
    instructions: string[];
    targetMuscle: string;
    tips: string;
    alternateVersions: string[];
  } | null;
}

const ExerciseDetail = ({ isOpen, onClose, exercise }: ExerciseDetailProps) => {
  if (!exercise) return null;

  return (
    <Dialog open={isOpen} onOpenChange={(open) => !open && onClose()}>
      <DialogContent className="bg-app-background border-white/10 text-app-text max-w-md mx-auto p-0 overflow-hidden">
        <DialogHeader className="sticky top-0 z-10 bg-app-background/80 backdrop-blur-md">
          <div className="flex justify-between items-center p-4">
            <DialogTitle className="text-xl font-bold">{exercise.name}</DialogTitle>
            <DialogClose className="rounded-full bg-white/10 p-1 hover:bg-white/20">
              <X size={18} />
            </DialogClose>
          </div>
        </DialogHeader>
        
        <div className="px-4 pb-4">
          <div className="rounded-xl overflow-hidden mb-4 aspect-video bg-white/5">
            <img 
              src={exercise.imageUrl} 
              alt={exercise.name} 
              className="w-full h-full object-cover"
            />
          </div>
          
          <div className="mb-4">
            <h4 className="font-medium mb-2">Instructions</h4>
            <ol className="list-decimal pl-5 space-y-2 text-sm text-app-text/90">
              {exercise.instructions.map((step, index) => (
                <li key={index}>{step}</li>
              ))}
            </ol>
          </div>
          
          <div className="mb-4">
            <h4 className="font-medium mb-2">Target Muscle Group</h4>
            <p className="text-sm text-app-text/90">{exercise.targetMuscle}</p>
          </div>
          
          <div className="bg-white/5 rounded-lg p-3 mb-4">
            <div className="flex items-start">
              <Info size={18} className="text-app-secondary mr-2 mt-0.5" />
              <div>
                <h4 className="font-medium mb-1">Form Tips</h4>
                <p className="text-sm text-app-text/90">{exercise.tips}</p>
              </div>
            </div>
          </div>
          
          <div className="flex gap-3 mt-6">
            <button className="flex-1 bg-app-secondary rounded-lg py-3 font-medium text-app-background flex items-center justify-center">
              <Clock size={18} className="mr-2" />
              Start Timer
            </button>
            <button className="bg-white/10 rounded-lg p-3">
              <Heart size={20} />
            </button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default ExerciseDetail;
