import React from 'react';

const LoadingScreen: React.FC = () => {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-black">
      <div className="w-16 h-16 border-t-4 border-purple-500 rounded-full animate-spin"></div>
      <h2 className="mt-4 text-2xl font-bold text-white">Loading...</h2>
    </div>
  );
};

export default LoadingScreen;