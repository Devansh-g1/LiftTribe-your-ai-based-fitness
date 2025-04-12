import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { toast } from "@/components/ui/use-toast";
import { supabase } from "../lib/supabase";

const LoginPage: React.FC = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [isSignup, setIsSignup] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    // Check if user is already logged in
    const checkSession = async () => {
      try {
        const { data: { session } } = await supabase.auth.getSession();
        
        if (session) {
          // Check if user has a profile
          const { data: profileData, error } = await supabase
            .from('profiles')
            .select('*')
            .eq('user_id', session.user.id)
            .maybeSingle();
          
          if (error && error.code !== 'PGRST116') {
            console.error('Error checking profile:', error);
            return; // Stay on login page if there's an error
          }
          
          if (profileData) {
            navigate('/dashboard');
          } else {
            navigate('/profile-setup');
          }
        }
      } catch (error) {
        console.error('Error checking session:', error);
      }
    };
    
    checkSession();
  }, [navigate]);

  const handleAuth = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    
    try {
      if (isSignup) {
        // Handle signup
        const { data, error } = await supabase.auth.signUp({
          email,
          password,
        });
        
        if (error) throw error;
        
        if (data.user) {
          toast({
            title: "Account created successfully",
            description: "Please complete your profile.",
          });
          
          // Wait for a second to ensure the session is created
          await new Promise(resolve => setTimeout(resolve, 1000));
          
          // Check if session has been created
          const { data: sessionData } = await supabase.auth.getSession();
          
          if (sessionData.session) {
            navigate('/profile-setup');
          } else {
            // If no session, maybe we need email verification
            toast({
              title: "Verification Required",
              description: "Please check your email to verify your account, then log in.",
            });
            setIsSignup(false); // Switch to login mode
          }
        }
      } else {
        // Handle login
        const { data, error } = await supabase.auth.signInWithPassword({
          email,
          password,
        });
        
        if (error) throw error;
        
        toast({
          title: "Login successful",
          description: "Welcome back to LiftTribe!",
        });
                
        // Check if user has profile
        const { data: profileData, error: profileError } = await supabase
          .from('profiles')
          .select()
          .eq('user_id', data.user.id)
          .maybeSingle();
        
        if (profileError && profileError.code !== 'PGRST116') {
          console.error('Error checking profile:', profileError);
        }
        
        if (profileData) {
          // Store profile data in localStorage for easy access
          localStorage.setItem('userProfile', JSON.stringify(profileData));
          navigate('/dashboard');
        } else {
          navigate('/profile-setup');
        }
      }
    } catch (error: any) {
      console.error('Auth error:', error);
      toast({
        title: isSignup ? "Signup failed" : "Login failed",
        description: error.message || "Please check your credentials and try again.",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-black text-white p-4">
      <div className="w-full max-w-md space-y-8">
        <div className="text-center">
          <h1 className="text-4xl font-bold tracking-tight text-purple-500">LiftTribe</h1>
          <p className="mt-2 text-gray-400">Your AI-based fitness companion</p>
        </div>
        
        <form className="mt-8 space-y-6" onSubmit={handleAuth}>
          <div className="space-y-4">
            <div>
              <label htmlFor="email" className="block text-sm font-medium text-gray-300">
                Email
              </label>
              <Input
                id="email"
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="bg-gray-800 border-gray-700 text-white"
                placeholder="Enter your email"
              />
            </div>
            
            <div>
              <label htmlFor="password" className="block text-sm font-medium text-gray-300">
                Password
              </label>
              <Input
                id="password"
                type="password"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="bg-gray-800 border-gray-700 text-white"
                placeholder="Enter your password"
                minLength={6}
              />
              {isSignup && (
                <p className="text-xs text-gray-400 mt-1">Password must be at least 6 characters</p>
              )}
            </div>
          </div>

          <div>
            <Button
              type="submit"
              className="w-full bg-purple-600 hover:bg-purple-700"
              disabled={isLoading}
            >
              {isLoading ? (isSignup ? "Creating account..." : "Logging in...") : (isSignup ? "Sign up" : "Sign in")}
            </Button>
          </div>
          
          <div className="text-center text-sm">
            <p className="text-gray-400">
              {isSignup ? "Already have an account?" : "Don't have an account?"}{" "}
              <button
                type="button"
                onClick={() => setIsSignup(!isSignup)}
                className="text-purple-500 hover:text-purple-400"
              >
                {isSignup ? "Sign in" : "Sign up"}
              </button>
            </p>
          </div>
        </form>
      </div>
    </div>
  );
};

export default LoginPage;