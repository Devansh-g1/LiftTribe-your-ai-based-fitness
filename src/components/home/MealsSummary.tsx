
import React from 'react';

const MealsSummary = () => {
  const meals = [
    { id: 1, type: "Breakfast", completed: true },
    { id: 2, type: "Lunch", completed: false },
    { id: 3, type: "Dinner", completed: false },
    { id: 4, type: "Snack", completed: false },
  ];

  return (
    <div className="card">
      <h3 className="font-bold text-lg mb-3">Today's Meals</h3>
      <div className="flex flex-wrap gap-2">
        {meals.map((meal) => (
          <div 
            key={meal.id}
            className={`py-2 px-4 rounded-full text-sm font-medium ${
              meal.completed 
                ? 'bg-app-secondary/20 text-app-secondary' 
                : 'bg-white/10 text-app-text'
            }`}
          >
            {meal.type}
          </div>
        ))}
      </div>
    </div>
  );
};

export default MealsSummary;
