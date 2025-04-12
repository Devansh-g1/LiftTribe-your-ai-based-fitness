import React from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import { Skeleton } from '../components/ui/skeleton';

interface ProtectedRouteProps {
  children: React.ReactNode;
}

const ProtectedRoute: React.FC<ProtectedRouteProps> = ({ children }) => {
  const { user, loading, userProfile, isNewUser } = useAuth();
  const location = useLocation();

  console.log('ProtectedRoute state:', { loading, user: !!user, isNewUser, hasProfile: !!userProfile?.fullName });

  // Show loading state while checking authentication
  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-app-background">
        <div className="text-app-primary text-xl">Loading...</div>
      </div>
    );
  }

  // Redirect to login if not authenticated
  if (!user) {
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  // If user is authenticated but hasn't completed profile setup (and isn't already on the setup page)
  if ((isNewUser || !userProfile?.fullName) && location.pathname !== '/profile-setup') {
    return <Navigate to="/profile-setup" replace />;
  }

  // Render children if authenticated and profile is complete
  return <>{children}</>;
};

export default ProtectedRoute;