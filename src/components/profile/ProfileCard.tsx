
import React from 'react';
import { Camera } from 'lucide-react';
import { useAuth } from '../../contexts/AuthContext';

const ProfileCard = () => {
  const { user } = useAuth();
  
  // Get user information, defaulting to placeholders if not available
  const userInfo = {
    name: user?.user_metadata?.name || 'Fitness User',
    age: user?.user_metadata?.age || 28,
    gender: user?.user_metadata?.gender || 'Not specified',
    imageUrl: user?.user_metadata?.avatar_url || null // Placeholder for when user hasn't uploaded an image
  };

  return (
    <div className="card flex items-center">
      <div className="relative mr-4">
        <div className="w-20 h-20 rounded-full bg-app-primary/20 flex items-center justify-center overflow-hidden">
          {userInfo.imageUrl ? (
            <img 
              src={userInfo.imageUrl} 
              alt={userInfo.name} 
              className="w-full h-full object-cover"
            />
          ) : (
            <span className="text-3xl font-medium text-app-primary">
              {userInfo.name.charAt(0)}
            </span>
          )}
        </div>
        <button className="absolute bottom-0 right-0 w-7 h-7 bg-app-primary rounded-full flex items-center justify-center border-2 border-app-background">
          <Camera size={14} />
        </button>
      </div>
      
      <div>
        <h3 className="font-bold text-lg">{userInfo.name}</h3>
        <div className="text-sm text-app-text/70">
          {userInfo.age} years • {userInfo.gender}
        </div>
        <div className="text-xs text-app-text/50 mt-1">
          {user?.email}
        </div>
      </div>
    </div>
  );
};

export default ProfileCard;
