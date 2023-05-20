import React, { useState, useEffect } from 'react';
import Meal from "./Meal";
import axios from "axios";

const MealsList = () => {
  const [meals, setMeals] = useState([]);

  useEffect(() => {
    fetchMeals();
  }, []);

  const fetchMeals = async () => {
    try {
      const response = await axios.get("/api/meals");
      setMeals(response.data);
    } catch (error) {
      console.error("Error fetching meals:", error);
    }
  };

  return (
    <div className="meal-grid">
      {meals.map((meal) => (
        <Meal key={meal.id} meal={meal} />
      ))}
    </div>
  );
};

export default MealsList;

/* function MealsList() {
  const [meals, setMeals] = useState([]);

  useEffect(() => {
    fetchMeals();
  }, []);

  const fetchMeals = async () => {
    try {
      const response = await fetch('/api/meals'); // Assuming the API endpoint is '/api/meals'
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

export default MealsList; */
