
import { createClient } from '@supabase/supabase-js';

// These are placeholder values - you'll need to replace these with your actual Supabase URL and anon key
// after connecting your Lovable project to Supabase
const supabaseUrl = 'https://qxblsyfhiiwflcuqcepf.supabase.co';
const supabaseAnonKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InF4YmxzeWZoaWl3ZmxjdXFjZXBmIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDQ0NDY2MDcsImV4cCI6MjA2MDAyMjYwN30.rf5ypmR_T2kFNJ_CGlCwEuwuzzecnfeTtPwV9kJQ4Zg';

export const supabase = createClient(supabaseUrl, supabaseAnonKey);

// Helper functions for authentication
export const signUp = async (email: string, password: string) => {
  const { data, error } = await supabase.auth.signUp({
    email,
    password,
  });
  return { data, error };
};

export const signIn = async (email: string, password: string) => {
  const { data, error } = await supabase.auth.signInWithPassword({
    email,
    password,
  });
  return { data, error };
};

export const signOut = async () => {
  const { error } = await supabase.auth.signOut();
  return { error };
};

export const getCurrentUser = async () => {
  const { data } = await supabase.auth.getUser();
  return data?.user;
};
