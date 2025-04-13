import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { supabase } from "../lib/supabase";

const Dashboard: React.FC = () => {
  const [profile, setProfile] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();
  
  useEffect(() => {
    const fetchProfile = async () => {
      try {
        // First check if user is authenticated
        const { data: { user } } = await supabase.auth.getUser();
        
        if (!user) {
          navigate('/login');
          return;
        }
        
        // Try getting profile from localStorage first (for better UX)
        const storedProfile = localStorage.getItem('userProfile');
        if (storedProfile) {
          setProfile(JSON.parse(storedProfile));
          setLoading(false);
        }
        
        // Still fetch from the database to ensure we have latest data
        const { data, error } = await supabase
          .from('profiles')
          .select('*')
          .eq('user_id', user.id)
          .single();
        
        if (error) {
          console.error('Error fetching profile:', error);
          // If no profile exists and we don't have one in localStorage, redirect to profile setup
          if (!storedProfile) {
            navigate('/profile-setup');
          }
        } else if (data) {
          setProfile(data);
          // Update localStorage
          localStorage.setItem('userProfile', JSON.stringify(data));
        }
      } catch (error) {
        console.error('Error in dashboard:', error);
      } finally {
        setLoading(false);
      }
    };
    
    fetchProfile();
  }, [navigate]);
  
  const handleSignOut = async () => {
    try {
      await supabase.auth.signOut();
      localStorage.removeItem('userProfile');
      navigate('/login');
    } catch (error) {
      console.error('Error signing out:', error);
    }
  };
  
  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-black">
        <div className="text-white">Loading...</div>
      </div>
    );
  }
  
  if (!profile) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-black">
        <div className="text-white">Profile not found. Please set up your profile.</div>
      </div>
    );
  }
  
  return (
    <div className="min-h-screen bg-black text-white p-4">
      <div className="max-w-7xl mx-auto">
        <header className="flex justify-between items-center mb-8">
          <h1 className="text-3xl font-bold text-purple-500">LiftTribe</h1>
          <button 
            onClick={handleSignOut}
            className="px-4 py-2 bg-gray-800 rounded hover:bg-gray-700 transition"
          >
            Sign Out
          </button>
        </header>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <Card className="bg-gray-800 border-gray-700">
            <CardHeader>
              <CardTitle className="text-purple-400">Welcome, {profile.name}!</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-gray-300 mb-4">Let's achieve your fitness goals together.</p>
              <div className="space-y-2">
                <p><span className="text-gray-400">Goal:</span> {profile.goal?.replace(/_/g, ' ')}</p>
              </div>
            </CardContent>
          </Card>
          
          <Card className="bg-gray-800 border-gray-700">
            <CardHeader>
              <CardTitle className="text-purple-400">Your Stats</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-2">
                <p><span className="text-gray-400">Age:</span> {profile.age} years</p>
                <p><span className="text-gray-400">Height:</span> {profile.height} cm</p>
                <p><span className="text-gray-400">Weight:</span> {profile.weight} kg</p>
                <p><span className="text-gray-400">Gender:</span> {profile.gender}</p>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;