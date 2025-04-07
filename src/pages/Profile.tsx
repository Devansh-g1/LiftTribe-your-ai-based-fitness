
import React, { useState } from 'react';
import MobileLayout from '../components/MobileLayout';
import ProfileCard from '../components/profile/ProfileCard';
import PreferenceSection, { PreferenceItem } from '../components/profile/PreferenceSection';
import { Target, Dumbbell, UtensilsCrossed, Bell, RefreshCw, HelpCircle, LogOut } from 'lucide-react';

const Profile = () => {
  const [notifications, setNotifications] = useState({
    workout: true,
    meal: true,
    water: false,
  });

  const toggleNotification = (type: keyof typeof notifications) => {
    setNotifications(prev => ({
      ...prev,
      [type]: !prev[type]
    }));
  };

  return (
    <MobileLayout activeTab="profile">
      <h2 className="text-2xl font-bold mb-6">Profile</h2>
      
      <ProfileCard />
      
      <PreferenceSection title="Goal Settings" icon={<Target size={16} className="text-app-primary" />}>
        <PreferenceItem label="Fitness Goal" value="Lose Weight" onClick={() => {}} />
        <PreferenceItem label="Fitness Level" value="Intermediate" onClick={() => {}} />
        <PreferenceItem 
          label="Recalculate AI Plan" 
          onClick={() => {}}
        />
      </PreferenceSection>
      
      <PreferenceSection title="Equipment" icon={<Dumbbell size={16} className="text-app-primary" />}>
        <PreferenceItem label="Bodyweight" toggle checked={true} onToggle={() => {}} />
        <PreferenceItem label="Dumbbells" toggle checked={true} onToggle={() => {}} />
        <PreferenceItem label="Resistance Bands" toggle checked={false} onToggle={() => {}} />
      </PreferenceSection>
      
      <PreferenceSection title="Diet Preferences" icon={<UtensilsCrossed size={16} className="text-app-primary" />}>
        <PreferenceItem label="Diet Type" value="Non-Vegetarian" onClick={() => {}} />
        <PreferenceItem label="Food Allergies" value="None" onClick={() => {}} />
        <PreferenceItem label="Calorie Target" value="2000 kcal/day" onClick={() => {}} />
      </PreferenceSection>
      
      <PreferenceSection title="Notifications" icon={<Bell size={16} className="text-app-primary" />}>
        <PreferenceItem 
          label="Workout Reminders" 
          toggle 
          checked={notifications.workout} 
          onToggle={() => toggleNotification('workout')} 
        />
        <PreferenceItem 
          label="Meal Reminders" 
          toggle 
          checked={notifications.meal} 
          onToggle={() => toggleNotification('meal')} 
        />
        <PreferenceItem 
          label="Water Reminders" 
          toggle 
          checked={notifications.water} 
          onToggle={() => toggleNotification('water')} 
        />
      </PreferenceSection>
      
      <PreferenceSection title="More" icon={<RefreshCw size={16} className="text-app-primary" />}>
        <PreferenceItem label="About & Support" onClick={() => {}} />
        <PreferenceItem 
          label="Log Out" 
          onClick={() => {}}
        />
      </PreferenceSection>
    </MobileLayout>
  );
};

export default Profile;
