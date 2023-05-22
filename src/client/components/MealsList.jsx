
import React, { useState, useEffect } from 'react';
import Meal from './Meal';

const MealsList = () => {
  const [meals, setMeals] = useState([]);

  useEffect(() => {
    fetch('http://localhost:5000/all-meals')
      .then((response) => response.json())
      .then((data) => setMeals(data))
      .catch((error) => console.log(error));
  }, []);

  return (
    <div className="meal-grid">
      {meals.map((meal) => (
        <Meal key={meal.id} meal={meal} />
      ))}
    </div>
  );
};

export default MealsList;


