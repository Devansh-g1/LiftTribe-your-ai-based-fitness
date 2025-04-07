
import React, { useState } from 'react';
import MobileLayout from '../components/MobileLayout';
import WorkoutTabs from '../components/workout/WorkoutTabs';
import WorkoutSummary from '../components/workout/WorkoutSummary';
import ExerciseCard from '../components/workout/ExerciseCard';
import ExerciseDetail from '../components/workout/ExerciseDetail';
import { TabsContent } from '@/components/ui/tabs';

const Workout = () => {
  const [exercises, setExercises] = useState([
    {
      id: 1,
      name: 'Push-ups',
      equipment: 'bodyweight' as const,
      imageUrl: 'https://images.unsplash.com/photo-1616803689943-5601631c7fec?q=80&w=2070&auto=format&fit=crop',
      reps: 12,
      sets: 3,
      completed: false,
      instructions: [
        'Start in a plank position with hands shoulder-width apart',
        'Lower your body until your chest nearly touches the floor',
        'Push back up to the starting position',
        'Repeat for the required number of repetitions'
      ],
      targetMuscle: 'Chest, Shoulders, Triceps',
      tips: 'Keep your core tight and body in a straight line from head to heels. Don\'t let your hips sag.',
      alternateVersions: ['Knee Push-ups', 'Incline Push-ups', 'Decline Push-ups']
    },
    {
      id: 2,
      name: 'Dumbbell Rows',
      equipment: 'dumbbell' as const,
      imageUrl: 'https://images.unsplash.com/photo-1596357395217-80de13130e92?q=80&w=2071&auto=format&fit=crop',
      reps: 10,
      sets: 3,
      completed: false,
      instructions: [
        'Place your right knee and hand on a bench',
        'Hold a dumbbell in your left hand with arm extended',
        'Pull the dumbbell up to your side, keeping your elbow close to your body',
        'Lower the dumbbell back to the starting position',
        'Complete all reps on one side before switching'
      ],
      targetMuscle: 'Back, Biceps',
      tips: 'Focus on squeezing your shoulder blade as you pull the weight. Keep your back flat and core engaged.',
      alternateVersions: ['Barbell Rows', 'Cable Rows', 'Inverted Rows']
    },
    {
      id: 3,
      name: 'Squats',
      equipment: 'bodyweight' as const,
      imageUrl: 'https://images.unsplash.com/photo-1547919307-1ecb10702e6f?q=80&w=2068&auto=format&fit=crop',
      reps: 15,
      sets: 3,
      completed: false,
      instructions: [
        'Stand with feet shoulder-width apart',
        'Bend your knees and lower your hips, as if sitting in a chair',
        'Keep your chest up and knees tracking over your toes',
        'Push through your heels to return to standing position'
      ],
      targetMuscle: 'Quadriceps, Hamstrings, Glutes',
      tips: 'Keep your weight in your heels and don\'t let your knees cave inward.',
      alternateVersions: ['Goblet Squats', 'Split Squats', 'Jump Squats']
    },
    {
      id: 4,
      name: 'Resistance Band Curls',
      equipment: 'band' as const,
      imageUrl: 'https://images.unsplash.com/photo-1633443596096-8163e60a531e?q=80&w=2070&auto=format&fit=crop',
      reps: 12,
      sets: 3,
      completed: false,
      instructions: [
        'Stand on the middle of a resistance band with feet shoulder-width apart',
        'Hold the handles with palms facing forward',
        'Keeping your elbows close to your sides, curl your hands toward your shoulders',
        'Slowly lower back to the starting position'
      ],
      targetMuscle: 'Biceps',
      tips: 'Maintain tension in the band throughout the movement. Don\'t swing your body to generate momentum.',
      alternateVersions: ['Dumbbell Curls', 'Hammer Curls', 'Concentration Curls']
    },
  ]);

  const [selectedExercise, setSelectedExercise] = useState<number | null>(null);
  const [showExerciseDetail, setShowExerciseDetail] = useState(false);

  const handleToggleComplete = (id: number) => {
    setExercises(prev => prev.map(ex => 
      ex.id === id ? { ...ex, completed: !ex.completed } : ex
    ));
  };

  const handleExerciseClick = (id: number) => {
    setSelectedExercise(id);
    setShowExerciseDetail(true);
  };

  const getExerciseById = (id: number | null) => {
    if (id === null) return null;
    return exercises.find(ex => ex.id === id) || null;
  };

  return (
    <MobileLayout activeTab="workout">
      <h2 className="text-2xl font-bold mb-6">Workout Plan</h2>
      
      <WorkoutTabs>
        <TabsContent value="today" className="space-y-4 mt-4">
          <WorkoutSummary 
            type="Upper Body Strength" 
            duration={45} 
            intensity="Intermediate" 
          />
          
          <div className="space-y-3">
            {exercises.map(exercise => (
              <ExerciseCard 
                key={exercise.id}
                exercise={exercise}
                onToggleComplete={handleToggleComplete}
                onClick={handleExerciseClick}
              />
            ))}
          </div>
        </TabsContent>
        
        <TabsContent value="weekly" className="mt-4">
          <div className="glass-card p-5 text-center">
            <h3 className="font-medium text-lg mb-2">Weekly Plan</h3>
            <p className="text-app-text/70">Your weekly workout schedule will appear here</p>
          </div>
        </TabsContent>
        
        <TabsContent value="history" className="mt-4">
          <div className="glass-card p-5 text-center">
            <h3 className="font-medium text-lg mb-2">Workout History</h3>
            <p className="text-app-text/70">Your workout history will appear here</p>
          </div>
        </TabsContent>
      </WorkoutTabs>
      
      <ExerciseDetail 
        isOpen={showExerciseDetail}
        onClose={() => setShowExerciseDetail(false)}
        exercise={getExerciseById(selectedExercise)}
      />
    </MobileLayout>
  );
};

export default Workout;
