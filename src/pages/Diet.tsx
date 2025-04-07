
import React, { useState } from 'react';
import MobileLayout from '../components/MobileLayout';
import WorkoutTabs from '../components/workout/WorkoutTabs';
import MealCard from '../components/diet/MealCard';
import MealDetail from '../components/diet/MealDetail';
import { TabsContent } from '@/components/ui/tabs';

const Diet = () => {
  const [meals, setMeals] = useState([
    {
      id: 1,
      type: 'Breakfast',
      name: 'Greek Yogurt with Berries',
      imageUrl: 'https://images.unsplash.com/photo-1542691457-cbe4df041eb2?q=80&w=2070&auto=format&fit=crop',
      calories: 320,
      protein: 22,
      carbs: 35,
      fat: 10,
      ingredients: [
        '1 cup Greek yogurt (0% fat)',
        '1/2 cup mixed berries',
        '1 tbsp honey',
        '1 tbsp chia seeds'
      ],
      preparation: [
        'Add Greek yogurt to a bowl',
        'Top with mixed berries',
        'Drizzle with honey',
        'Sprinkle chia seeds on top'
      ]
    },
    {
      id: 2,
      type: 'Lunch',
      name: 'Chicken & Quinoa Bowl',
      imageUrl: 'https://images.unsplash.com/photo-1546793665-c74683f339c1?q=80&w=2187&auto=format&fit=crop',
      calories: 450,
      protein: 35,
      carbs: 45,
      fat: 12,
      ingredients: [
        '4 oz grilled chicken breast',
        '1/2 cup cooked quinoa',
        '1 cup mixed vegetables (bell peppers, zucchini, onions)',
        '1 tbsp olive oil',
        '1 tsp herbs and spices'
      ],
      preparation: [
        'Cook quinoa according to package instructions',
        'Grill chicken breast with spices',
        'Sauté vegetables in olive oil',
        'Combine all ingredients in a bowl'
      ]
    },
    {
      id: 3,
      type: 'Dinner',
      name: 'Baked Salmon with Vegetables',
      imageUrl: 'https://images.unsplash.com/photo-1519708227418-c8fd9a32b7a2?q=80&w=2070&auto=format&fit=crop',
      calories: 520,
      protein: 40,
      carbs: 30,
      fat: 25,
      ingredients: [
        '6 oz salmon fillet',
        '1 cup broccoli',
        '1 medium sweet potato',
        '2 tsp olive oil',
        'Lemon, garlic, dill for seasoning',
        'Salt and pepper to taste'
      ],
      preparation: [
        'Preheat oven to 400°F (200°C)',
        'Season salmon with lemon, garlic, dill, salt, and pepper',
        'Toss vegetables in olive oil and seasonings',
        'Bake salmon and vegetables for 15-20 minutes'
      ]
    },
    {
      id: 4,
      type: 'Snack',
      name: 'Protein Smoothie',
      imageUrl: 'https://images.unsplash.com/photo-1570696516188-ade861b94fd0?q=80&w=2070&auto=format&fit=crop',
      calories: 240,
      protein: 25,
      carbs: 20,
      fat: 5,
      ingredients: [
        '1 scoop protein powder',
        '1 banana',
        '1 cup almond milk',
        '1/2 cup spinach',
        '1 tbsp peanut butter',
        'Ice cubes'
      ],
      preparation: [
        'Add all ingredients to a blender',
        'Blend until smooth',
        'Add more almond milk if needed for desired consistency'
      ]
    },
  ]);

  const [selectedMeal, setSelectedMeal] = useState<number | null>(null);
  const [showMealDetail, setShowMealDetail] = useState(false);

  const handleMealClick = (id: number) => {
    setSelectedMeal(id);
    setShowMealDetail(true);
  };

  const getMealById = (id: number | null) => {
    if (id === null) return null;
    return meals.find(meal => meal.id === id) || null;
  };

  return (
    <MobileLayout activeTab="diet">
      <h2 className="text-2xl font-bold mb-6">Diet Plan</h2>
      
      <WorkoutTabs>
        <TabsContent value="today" className="space-y-4 mt-4">
          {meals.map(meal => (
            <MealCard 
              key={meal.id} 
              meal={meal} 
              onClick={handleMealClick}
            />
          ))}
        </TabsContent>
        
        <TabsContent value="weekly" className="mt-4">
          <div className="glass-card p-5 text-center">
            <h3 className="font-medium text-lg mb-2">Weekly Meal Plan</h3>
            <p className="text-app-text/70">Your weekly meal schedule will appear here</p>
          </div>
        </TabsContent>
        
        <TabsContent value="history" className="mt-4">
          <div className="glass-card p-5 text-center">
            <h3 className="font-medium text-lg mb-2">Diet History</h3>
            <p className="text-app-text/70">Your meal history will appear here</p>
          </div>
        </TabsContent>
      </WorkoutTabs>
      
      <MealDetail 
        isOpen={showMealDetail}
        onClose={() => setShowMealDetail(false)}
        meal={getMealById(selectedMeal)}
      />
    </MobileLayout>
  );
};

export default Diet;
