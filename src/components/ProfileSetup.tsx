import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { toast } from "@/components/ui/use-toast";
import { supabase } from "../lib/supabase";

const ProfileSetup: React.FC = () => {
  const [name, setName] = useState('');
  const [age, setAge] = useState('');
  const [height, setHeight] = useState('');
  const [weight, setWeight] = useState('');
  const [gender, setGender] = useState('');
  const [goal, setGoal] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const checkAuth = async () => {
      const { data: { session } } = await supabase.auth.getSession();
      if (!session) {
        // Not authenticated, redirect to login
        console.log("User not authenticated, redirecting to login");
        navigate('/login');
      } else {
        console.log("User authenticated, staying on profile setup");
        setIsAuthenticated(true);
      }
    };
    
    checkAuth();
  }, [navigate]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    
    try {
      // Get the current user
      const { data: { user } } = await supabase.auth.getUser();
      
      if (!user) {
        throw new Error('User not authenticated');
      }
      
      console.log("Creating profile for user:", user.id);
      
      // Create the profile data
      const profileData = {
        user_id: user.id,
        name,
        age: parseInt(age),
        height: parseFloat(height),
        weight: parseFloat(weight),
        gender,
        goal,
        created_at: new Date().toISOString()
      };
      
      // Save to Supabase profiles table
      const { error } = await supabase
        .from('profiles')
        .insert([profileData]);
      
      if (error) {
        console.error('Error creating profile:', error);
        throw error;
      }
      
      console.log("Profile created successfully");
      
      // Save to localStorage for easy access
      localStorage.setItem('userProfile', JSON.stringify(profileData));
      
      toast({
        title: "Profile created successfully!",
        description: "Welcome to LiftTribe. Let's start your fitness journey!",
      });
      
      navigate('/dashboard');
    } catch (error: any) {
      console.error('Profile creation error:', error);
      toast({
        title: "Error creating profile",
        description: error.message || "Please try again later.",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  if (!isAuthenticated) {
    return null; // Don't render anything until authentication is checked
  }

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-black text-white p-4">
      <div className="w-full max-w-md space-y-8">
        <div className="text-center">
          <h1 className="text-3xl font-bold tracking-tight text-purple-500">Complete Your Profile</h1>
          <p className="mt-2 text-gray-400">Help us personalize your fitness journey</p>
        </div>
        
        <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
          <div className="space-y-4">
            <div>
              <label htmlFor="name" className="block text-sm font-medium text-gray-300">
                Full Name
              </label>
              <Input
                id="name"
                type="text"
                required
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="bg-gray-800 border-gray-700 text-white"
              />
            </div>
            
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label htmlFor="age" className="block text-sm font-medium text-gray-300">
                  Age
                </label>
                <Input
                  id="age"
                  type="number"
                  required
                  value={age}
                  onChange={(e) => setAge(e.target.value)}
                  className="bg-gray-800 border-gray-700 text-white"
                />
              </div>
              
              <div>
                <label htmlFor="gender" className="block text-sm font-medium text-gray-300">
                  Gender
                </label>
                <Select value={gender} onValueChange={setGender}>
                  <SelectTrigger className="bg-gray-800 border-gray-700 text-white">
                    <SelectValue placeholder="Select" />
                  </SelectTrigger>
                  <SelectContent className="bg-gray-800 border-gray-700 text-white">
                    <SelectItem value="male">Male</SelectItem>
                    <SelectItem value="female">Female</SelectItem>
                    <SelectItem value="other">Other</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
            
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label htmlFor="height" className="block text-sm font-medium text-gray-300">
                  Height (cm)
                </label>
                <Input
                  id="height"
                  type="number"
                  required
                  value={height}
                  onChange={(e) => setHeight(e.target.value)}
                  className="bg-gray-800 border-gray-700 text-white"
                />
              </div>
              
              <div>
                <label htmlFor="weight" className="block text-sm font-medium text-gray-300">
                  Weight (kg)
                </label>
                <Input
                  id="weight"
                  type="number"
                  required
                  value={weight}
                  onChange={(e) => setWeight(e.target.value)}
                  className="bg-gray-800 border-gray-700 text-white"
                />
              </div>
            </div>
            
            <div>
              <label htmlFor="goal" className="block text-sm font-medium text-gray-300">
                Fitness Goal
              </label>
              <Select value={goal} onValueChange={setGoal}>
                <SelectTrigger className="bg-gray-800 border-gray-700 text-white">
                  <SelectValue placeholder="Select your goal" />
                </SelectTrigger>
                <SelectContent className="bg-gray-800 border-gray-700 text-white">
                  <SelectItem value="lose_weight">Lose Weight</SelectItem>
                  <SelectItem value="build_muscle">Build Muscle</SelectItem>
                  <SelectItem value="increase_strength">Increase Strength</SelectItem>
                  <SelectItem value="improve_fitness">Improve General Fitness</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          <div>
            <Button
              type="submit"
              className="w-full bg-purple-600 hover:bg-purple-700"
              disabled={isLoading}
            >
              {isLoading ? "Creating Profile..." : "Complete Setup"}
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default ProfileSetup;