
import React from 'react';
import MobileLayout from '../components/MobileLayout';
import WelcomeBanner from '../components/home/WelcomeBanner';
import WorkoutCard from '../components/home/WorkoutCard';
import MealsSummary from '../components/home/MealsSummary';
import HydrationTracker from '../components/home/HydrationTracker';
import ProgressSnapshot from '../components/home/ProgressSnapshot';

const Home = () => {
  return (
    <MobileLayout activeTab="home">
      <WelcomeBanner />
      <WorkoutCard />
      <MealsSummary />
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <HydrationTracker />
        <ProgressSnapshot />
      </div>
    </MobileLayout>
  );
};

export default Home;
