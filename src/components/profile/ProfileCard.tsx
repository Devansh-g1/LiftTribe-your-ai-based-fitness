
import React from 'react';
import { Camera } from 'lucide-react';

const ProfileCard = () => {
  const user = {
    name: 'Alex Johnson',
    age: 28,
    gender: 'Male',
    imageUrl: null // Placeholder for when user hasn't uploaded an image
  };

  return (
    <div className="card flex items-center">
      <div className="relative mr-4">
        <div className="w-20 h-20 rounded-full bg-app-primary/20 flex items-center justify-center overflow-hidden">
          {user.imageUrl ? (
            <img 
              src={user.imageUrl} 
              alt={user.name} 
              className="w-full h-full object-cover"
            />
          ) : (
            <span className="text-3xl font-medium text-app-primary">
              {user.name.charAt(0)}
            </span>
          )}
        </div>
        <button className="absolute bottom-0 right-0 w-7 h-7 bg-app-primary rounded-full flex items-center justify-center border-2 border-app-background">
          <Camera size={14} />
        </button>
      </div>
      
      <div>
        <h3 className="font-bold text-lg">{user.name}</h3>
        <div className="text-sm text-app-text/70">
          {user.age} years • {user.gender}
        </div>
      </div>
    </div>
  );
};

export default ProfileCard;
