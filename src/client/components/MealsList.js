import React, { useState, useEffect } from 'react';

function MealsList() {
  const [meals, setMeals] = useState([]);

  useEffect(() => {
    fetchMeals();
  }, []);

  const fetchMeals = async () => {
    try {
      const response = await fetch('/api/meals'); 
      const data = await response.json();
      setMeals(data);
    } catch (error) {
      console.error('Error fetching meals:', error);
    }
  };

  return (
    <div>
      <h2>Meals List</h2>
      {meals.map((meal) => (
        <div key={meal.id}>
          <h3>{meal.title}</h3>
          <p>{meal.description}</p>
          <p>Price: {meal.price}</p>
        </div>
      ))}
    </div>
  );
}

export default MealsList;
