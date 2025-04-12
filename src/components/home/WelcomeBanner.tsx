
import React from 'react';
import { useAuth } from '../../contexts/AuthContext';
const WelcomeBanner = () => {
  const { userProfile } = useAuth();
  const userName = userProfile?.fullName || "User";
  const getTimeBasedGreeting = () => {
    const hour = new Date().getHours();
    if (hour < 12) return "Good morning";
    if (hour < 18) return "Good afternoon";
    return "Good evening";
  };

  return (
    <div className="mb-6">
      <h2 className="text-2xl font-bold">
        {getTimeBasedGreeting()}, {userName}!
      </h2>
      <p className="text-app-text/70">Ready to crush your goals today?</p>
    </div>
  );
};

export default WelcomeBanner;
