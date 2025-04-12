import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import LoadingScreen from "../components/LoadingScreen";
import { supabase } from "../lib/supabase";
import { toast } from "@/components/ui/use-toast";

const Index = () => {
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const checkAuthStatus = async () => {
      try {
        console.log("Checking auth status...");
        // Get the current session
        const { data: { session } } = await supabase.auth.getSession();
        
        if (session) {
          console.log("User is logged in, checking for profile...");
          // User is logged in, check if they have a profile
          const { data: profileData, error: profileError } = await supabase
            .from('profiles')
            .select('*')
            .eq('user_id', session.user.id)
            .maybeSingle();
          
          if (profileError) {
            console.error('Error fetching profile:', profileError);
            toast({
              title: "Error",
              description: "Could not fetch your profile. Please try logging in again.",
              variant: "destructive",
            });
            
            // Sign out the user if we can't fetch their profile
            await supabase.auth.signOut();
            navigate('/login');
            return;
          }
          
          if (profileData) {
            // User has a profile, store it and navigate to dashboard
            console.log("Profile found, navigating to dashboard");
            localStorage.setItem('userProfile', JSON.stringify(profileData));
            navigate('/dashboard');
          } else {
            // User is logged in but doesn't have a profile
            console.log("No profile found, navigating to profile setup");
            navigate('/profile-setup');
          }
        } else {
          // User is not logged in
          console.log("No session found, navigating to login");
          navigate('/login');
        }
      } catch (error) {
        console.error('Error checking auth status:', error);
        // On error, default to login page
        navigate('/login');
      } finally {
        setIsLoading(false);
      }
    };
    
    // Check auth status with a short timeout
    const timer = setTimeout(() => {
      checkAuthStatus();
    }, 1000);
    
    return () => clearTimeout(timer);
  }, [navigate]);

  return <LoadingScreen />;
};

export default Index;