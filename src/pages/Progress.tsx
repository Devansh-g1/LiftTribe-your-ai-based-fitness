
import React from 'react';
import MobileLayout from '../components/MobileLayout';
import ProgressChart from '../components/progress/ProgressChart';
import CaloriesBarChart from '../components/progress/CaloriesBarChart';
import AchievementCard from '../components/progress/AchievementCard';
import { Award, Droplet, Dumbbell, Flame } from 'lucide-react';

const Progress = () => {
  // Sample data for weight progress chart
  const weightData = [
    { date: 'Mon', value: 80.5 },
    { date: 'Tue', value: 80.2 },
    { date: 'Wed', value: 80.1 },
    { date: 'Thu', value: 79.8 },
    { date: 'Fri', value: 79.6 },
    { date: 'Sat', value: 79.5 },
    { date: 'Sun', value: 79.2 },
  ];

  // Sample data for calories chart
  const caloriesData = [
    { date: 'Mon', burned: 320, consumed: 1800 },
    { date: 'Tue', burned: 450, consumed: 1750 },
    { date: 'Wed', burned: 280, consumed: 1900 },
    { date: 'Thu', burned: 520, consumed: 1850 },
    { date: 'Fri', burned: 400, consumed: 1700 },
    { date: 'Sat', burned: 350, consumed: 2100 },
    { date: 'Sun', burned: 300, consumed: 1950 },
  ];

  // Sample data for water intake chart
  const waterData = [
    { date: 'Mon', value: 1800 },
    { date: 'Tue', value: 2200 },
    { date: 'Wed', value: 1900 },
    { date: 'Thu', value: 2500 },
    { date: 'Fri', value: 2300 },
    { date: 'Sat', value: 1500 },
    { date: 'Sun', value: 2000 },
  ];

  // Achievements data
  const achievements = [
    { 
      id: 1,
      title: 'First Workout',
      icon: <Dumbbell size={18} className="text-app-primary" />,
      unlocked: true,
      description: 'Completed your first workout'
    },
    { 
      id: 2,
      title: '7-Day Streak',
      icon: <Flame size={18} className="text-app-primary" />,
      unlocked: false,
      description: 'Exercise for 7 consecutive days'
    },
    { 
      id: 3,
      title: 'Hydration Master',
      icon: <Droplet size={18} className="text-app-primary" />,
      unlocked: true,
      description: 'Hit water goal for 5 consecutive days'
    },
    { 
      id: 4,
      title: 'Perfect Week',
      icon: <Award size={18} className="text-app-primary" />,
      unlocked: false,
      description: 'Complete all planned workouts in a week'
    },
  ];

  return (
    <MobileLayout activeTab="progress">
      <h2 className="text-2xl font-bold mb-6">Your Progress</h2>
      
      <ProgressChart 
        data={weightData} 
        title="Weight Progress" 
        unit="kg" 
        color="#795cfa"
      />
      
      <CaloriesBarChart data={caloriesData} />
      
      <ProgressChart 
        data={waterData} 
        title="Water Intake" 
        unit="ml" 
        color="#00dba8"
      />
      
      <div className="card">
        <h3 className="font-bold text-lg mb-4">Achievements</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
          {achievements.map(achievement => (
            <AchievementCard 
              key={achievement.id}
              title={achievement.title}
              icon={achievement.icon}
              unlocked={achievement.unlocked}
              description={achievement.description}
            />
          ))}
        </div>
      </div>
    </MobileLayout>
  );
};

export default Progress;
