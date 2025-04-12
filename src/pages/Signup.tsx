
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { useToast } from '@/hooks/use-toast';

const Signup = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const { signUp, setIsNewUser } = useAuth();
  const navigate = useNavigate();
  const { toast } = useToast();

  const handleSignup = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (password !== confirmPassword) {
      toast({
        title: "Passwords don't match",
        description: "Please make sure your passwords match",
        variant: "destructive",
      });
      return;
    }

    setLoading(true);

    try {
      const { error } = await signUp(email, password);
      
      if (error) {
        toast({
          title: "Registration error",
          description: error.message,
          variant: "destructive",
        });
      } else {
        setIsNewUser(true);
        toast({
          title: "Registration successful",
          description: "Please check your email to confirm your account",
        });
        navigate('/login');
      }
    } catch (error) {
      toast({
        title: "Error",
        description: "An unexpected error occurred",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-app-background p-4">
      <div className="w-full max-w-md glass-card rounded-xl p-8">
        <div className="text-center mb-8">
          <h2 className="text-3xl font-bold primary-gradient bg-clip-text text-transparent">LiftTribe</h2>
          <p className="text-app-text/70 mt-2">Join our fitness community</p>
        </div>

        <form onSubmit={handleSignup} className="space-y-4">
          <div>
            <label htmlFor="email" className="text-sm font-medium">Email</label>
            <Input
              id="email"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="you@example.com"
              className="mt-1"
              required
            />
          </div>

          <div>
            <label htmlFor="password" className="text-sm font-medium">Password</label>
            <Input
              id="password"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="••••••••"
              className="mt-1"
              required
            />
          </div>

          <div>
            <label htmlFor="confirmPassword" className="text-sm font-medium">Confirm Password</label>
            <Input
              id="confirmPassword"
              type="password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              placeholder="••••••••"
              className="mt-1"
              required
            />
          </div>

          <Button 
            type="submit" 
            className="w-full" 
            disabled={loading}
          >
            {loading ? 'Creating account...' : 'Create Account'}
          </Button>

          <div className="text-sm text-center mt-4">
            <span className="text-app-text/70">Already have an account? </span>
            <a 
              onClick={() => navigate('/login')} 
              className="text-app-primary cursor-pointer hover:underline"
            >
              Sign In
            </a>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Signup;
