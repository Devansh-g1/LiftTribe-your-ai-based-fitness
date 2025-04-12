import React, { useEffect, useState } from 'react';
import { Button } from "@/components/ui/button";
import { useNavigate } from 'react-router-dom';
import { toast } from "@/components/ui/use-toast";
import { supabase } from "../lib/supabase";

const Dashboard: React.FC = () => {
  const navigate = useNavigate();
  const [profile, setProfile] = useState<any>({});
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const getProfile = async () => {
      try {
        const { data: { user } } = await supabase.auth.getUser();
        
        if (!user) {
          throw new Error('User not authenticated');
        }
        
        // Get profile from Supabase
        const { data: profileData, error } = await supabase
          .from('profiles')
          .select('*')
          .eq('user_id', user.id)
          .single();
        
        if (error) throw error;
        
        if (profileData) {
          setProfile(profileData);
          localStorage.setItem('userProfile', JSON.stringify(profileData));
        } else {
          navigate('/profile-setup');
        }
      } catch (error) {
        console.error('Error fetching profile:', error);
        toast({
          title: "Error fetching profile",
          description: "Please try logging in again.",
          variant: "destructive",
        });
        navigate('/login');
      } finally {
        setIsLoading(false);
      }
    };
    
    getProfile();
  }, [navigate]);

  const handleLogout = async () => {
    try {
      await supabase.auth.signOut();
      localStorage.removeItem('userProfile');
      toast({
        title: "Logged out successfully",
        description: "Come back soon!",
      });
      navigate('/login');
    } catch (error) {
      toast({
        title: "Error logging out",
        description: "Please try again.",
        variant: "destructive",
      });
    }
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-black text-white flex items-center justify-center">
        <div className="w-16 h-16 border-t-4 border-purple-500 rounded-full animate-spin"></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-black text-white p-4">
      <header className="flex justify-between items-center mb-8">
        <h1 className="text-2xl font-bold text-purple-500">LiftTribe</h1>
        <Button variant="outline" onClick={handleLogout} className="border-purple-500 text-purple-500 hover:bg-purple-900">
          Logout
        </Button>
      </header>
      
      <main>
        <div className="bg-gray-900 rounded-lg p-6 mb-6">
          <h2 className="text-xl font-semibold mb-4">Welcome, {profile.name || 'Fitness Enthusiast'}!</h2>
          <p className="text-gray-400">Your personalized fitness journey is ready.</p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-8">
          <div className="bg-gray-900 rounded-lg p-6">
            <h3 className="text-lg font-medium mb-2">Today's Workout</h3>
            <p className="text-gray-400">Your AI-generated workout plan is ready for you.</p>
            <Button className="mt-4 bg-purple-600 hover:bg-purple-700">
              Start Workout
            </Button>
          </div>
          
          <div className="bg-gray-900 rounded-lg p-6">
            <h3 className="text-lg font-medium mb-2">Nutrition Plan</h3>
            <p className="text-gray-400">Check your personalized nutrition recommendations.</p>
            <Button className="mt-4 bg-purple-600 hover:bg-purple-700">
              View Plan
            </Button>
          </div>
        </div>
        
        <div className="bg-gray-900 rounded-lg p-6">
          <h3 className="text-lg font-medium mb-4">Progress Tracker</h3>
          <div className="h-40 flex items-center justify-center border border-gray-700 rounded-lg">
            <p className="text-gray-400">Your fitness progress visualization will appear here</p>
          </div>
        </div>
      </main>
    </div>
  );
};

export default Dashboard;