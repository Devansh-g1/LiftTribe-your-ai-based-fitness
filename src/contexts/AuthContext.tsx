import React, { createContext, useContext, useEffect, useState } from 'react';
import { supabase, getCurrentUser } from '../lib/supabase';
import { User } from '@supabase/supabase-js';

interface UserProfile {
  fullName?: string;
  weight?: number;
  height?: number;
  fitnessGoal?: string;
  fitnessLevel?: string;
  equipment?: string[];
}

interface AuthContextType {
  user: User | null;
  loading: boolean;
  userProfile: UserProfile | null;
  signIn: (email: string, password: string) => Promise<{
    data: any;
    error: any;
  }>;
  signUp: (email: string, password: string) => Promise<{
    data: any;
    error: any;
  }>;
  signOut: () => Promise<{
    error: any;
  }>;
  updateUserProfile: (profile: UserProfile) => Promise<void>;
  isNewUser: boolean;
  setIsNewUser: (value: boolean) => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [userProfile, setUserProfile] = useState<UserProfile | null>(null);
  const [loading, setLoading] = useState(true);
  const [isNewUser, setIsNewUser] = useState(false);

  useEffect(() => {
    // Check for existing session
    const checkUser = async () => {
      try {
        const user = await getCurrentUser();
        setUser(user || null);
        
        if (user) {
          // Fetch user profile from profiles table
          const { data, error } = await supabase
            .from('profiles')
            .select('*')
            .eq('id', user.id)
            .single();
            
          if (error) {
            console.error('Error fetching profile:', error);
          } else {
            setUserProfile(data || null);
          }
        }
      } catch (error) {
        console.error('Error checking user:', error);
      } finally {
        // Always set loading to false when initial check is complete
        setLoading(false);
      }
    };

    checkUser();

    // Listen for auth changes
    const { data: authListener } = supabase.auth.onAuthStateChange(
      async (event, session) => {
        console.log('Auth state changed:', event, session?.user?.id);
        setUser(session?.user || null);
        
        if (session?.user) {
          // Fetch user profile when auth state changes
          const { data, error } = await supabase
            .from('profiles')
            .select('*')
            .eq('id', session.user.id)
            .single();
            
          if (error && error.code !== 'PGRST116') { // PGRST116 is "no rows returned" error
            console.error('Error fetching profile:', error);
          } else {
            setUserProfile(data || null);
            // If no profile data exists, this might be a new user
            if (!data && event === 'SIGNED_IN') {
              setIsNewUser(true);
            }
          }
        } else {
          // Reset state when user signs out
          setUserProfile(null);
        }
        
        // Always update loading state after auth change completes
        setLoading(false);
      }
    );

    return () => {
      if (authListener && authListener.subscription) {
        authListener.subscription.unsubscribe();
      }
    };
  }, []);

  const updateUserProfile = async (profile: UserProfile) => {
    if (!user) throw new Error('No user logged in');
    
    try {
      const { error } = await supabase
        .from('profiles')
        .upsert({ 
          id: user.id, 
          ...profile,
          updated_at: new Date()
        });
        
      if (error) throw error;
      
      setUserProfile(prev => ({
        ...prev,
        ...profile
      }));
      
      setIsNewUser(false);
      return Promise.resolve();
    } catch (error) {
      console.error('Error updating profile:', error);
      return Promise.reject(error);
    }
  };

  const value = {
    user,
    loading,
    userProfile,
    isNewUser,
    setIsNewUser,
    signIn: async (email: string, password: string) => {
      return await supabase.auth.signInWithPassword({ email, password });
    },
    signUp: async (email: string, password: string) => {
      return await supabase.auth.signUp({ email, password });
    },
    signOut: async () => {
      setUserProfile(null);
      return await supabase.auth.signOut();
    },
    updateUserProfile
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export const useAuth = (): AuthContextType => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};