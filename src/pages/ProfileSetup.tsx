import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { useToast } from '@/hooks/use-toast';
import { useAuth } from '../contexts/AuthContext';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';

const ProfileSetup = () => {
const [fullName, setFullName] = useState('');
const [weight, setWeight] = useState('');
const [height, setHeight] = useState('');
const [fitnessGoal, setFitnessGoal] = useState('lose');
const [fitnessLevel, setFitnessLevel] = useState('beginner');
const [equipment, setEquipment] = useState<string[]>(['bodyweight']);
const [loading, setLoading] = useState(false);

const { updateUserProfile, user } = useAuth();
const navigate = useNavigate();
const { toast } = useToast();

const handleEquipmentToggle = (type: string) => {
    setEquipment(prev => 
    prev.includes(type) 
        ? prev.filter(item => item !== type) 
        : [...prev, type]
    );
};

const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!fullName) {
    toast({
        title: "Name required",
        description: "Please enter your name to continue",
        variant: "destructive",
    });
    return;
    }

    setLoading(true);

    try {
    console.log('Updating profile with:', { fullName, weight, height, fitnessGoal, fitnessLevel, equipment });
    
    await updateUserProfile({
        fullName,
        weight: parseFloat(weight) || 0,
        height: parseFloat(height) || 0,
        fitnessGoal,
        fitnessLevel,
        equipment
    });
    
    toast({
        title: "Profile updated",
        description: "Your profile has been set up successfully!",
    });
    
      // After a successful profile update, navigate to the home page
    navigate('/', { replace: true });
    } catch (error: any) {
    console.error('Error updating profile:', error);
    toast({
        title: "Error",
        description: error.message || "Failed to update your profile. Please try again.",
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
        <h2 className="text-3xl font-bold primary-gradient bg-clip-text text-transparent">Welcome to LiftTribe</h2>
        <p className="text-app-text/70 mt-2">Let's set up your fitness profile</p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
        <div>
            <label htmlFor="fullName" className="text-sm font-medium">Your Name</label>
            <Input
            id="fullName"
            value={fullName}
            onChange={(e) => setFullName(e.target.value)}
            placeholder="Enter your name"
            className="mt-1"
            required
            />
        </div>

        <div className="grid grid-cols-2 gap-4">
            <div>
            <label htmlFor="weight" className="text-sm font-medium">Weight (kg)</label>
            <Input
                id="weight"
                type="number"
                value={weight}
                onChange={(e) => setWeight(e.target.value)}
                placeholder="70"
                className="mt-1"
            />
            </div>
            <div>
            <label htmlFor="height" className="text-sm font-medium">Height (cm)</label>
            <Input
                id="height"
                type="number"
                value={height}
                onChange={(e) => setHeight(e.target.value)}
                placeholder="175"
                className="mt-1"
            />
            </div>
        </div>

        <div>
            <label htmlFor="fitnessGoal" className="text-sm font-medium">Fitness Goal</label>
            <Select value={fitnessGoal} onValueChange={setFitnessGoal}>
            <SelectTrigger className="mt-1">
                <SelectValue placeholder="Select a goal" />
            </SelectTrigger>
            <SelectContent>
                <SelectItem value="lose">Lose Weight</SelectItem>
                <SelectItem value="gain">Gain Muscle</SelectItem>
                <SelectItem value="maintain">Maintain Fitness</SelectItem>
                <SelectItem value="tone">Tone Body</SelectItem>
            </SelectContent>
            </Select>
        </div>

        <div>
            <label htmlFor="fitnessLevel" className="text-sm font-medium">Fitness Level</label>
            <Select value={fitnessLevel} onValueChange={setFitnessLevel}>
            <SelectTrigger className="mt-1">
                <SelectValue placeholder="Select your level" />
            </SelectTrigger>
            <SelectContent>
                <SelectItem value="beginner">Beginner</SelectItem>
                <SelectItem value="intermediate">Intermediate</SelectItem>
                <SelectItem value="advanced">Advanced</SelectItem>
            </SelectContent>
            </Select>
        </div>

        <div>
            <label className="text-sm font-medium">Available Equipment</label>
            <div className="grid grid-cols-2 gap-2 mt-1">
            <Button
                type="button"
                variant={equipment.includes('bodyweight') ? "default" : "outline"}
                className={`${equipment.includes('bodyweight') ? 'bg-app-primary' : ''}`}
                onClick={() => handleEquipmentToggle('bodyweight')}
            >
                Bodyweight
            </Button>
            <Button
                type="button"
                variant={equipment.includes('dumbbells') ? "default" : "outline"}
                className={`${equipment.includes('dumbbells') ? 'bg-app-primary' : ''}`}
                onClick={() => handleEquipmentToggle('dumbbells')}
            >
                Dumbbells
            </Button>
            <Button
                type="button"
                variant={equipment.includes('bands') ? "default" : "outline"}
                className={`${equipment.includes('bands') ? 'bg-app-primary' : ''}`}
                onClick={() => handleEquipmentToggle('bands')}
            >
                Resistance Bands
            </Button>
            <Button
                type="button"
                variant={equipment.includes('gym') ? "default" : "outline"}
                className={`${equipment.includes('gym') ? 'bg-app-primary' : ''}`}
                onClick={() => handleEquipmentToggle('gym')}
            >
                Full Gym
            </Button>
            </div>
        </div>

        <Button 
            type="submit" 
            className="w-full mt-6" 
            disabled={loading}
        >
            {loading ? 'Saving...' : 'Complete Setup'}
        </Button>
        </form>
    </div>
    </div>
);
};

export default ProfileSetup;