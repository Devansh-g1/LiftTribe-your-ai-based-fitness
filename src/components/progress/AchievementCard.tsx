
import React from 'react';

interface AchievementCardProps {
  title: string;
  icon: React.ReactNode;
  unlocked: boolean;
  description: string;
}

const AchievementCard = ({ title, icon, unlocked, description }: AchievementCardProps) => {
  return (
    <div className={`p-3 rounded-lg border ${
      unlocked 
        ? 'border-app-primary/30 bg-app-primary/10' 
        : 'border-white/10 bg-white/5'
    }`}>
      <div className="flex items-center">
        <div className={`w-10 h-10 rounded-full flex items-center justify-center mr-3 ${
          unlocked ? 'bg-app-primary/20' : 'bg-white/10'
        }`}>
          {icon}
        </div>
        <div>
          <h4 className={`font-medium ${unlocked ? 'text-app-primary' : 'text-app-text/50'}`}>
            {title}
          </h4>
          <p className="text-xs text-app-text/70">{description}</p>
        </div>
      </div>
    </div>
  );
};

export default AchievementCard;
