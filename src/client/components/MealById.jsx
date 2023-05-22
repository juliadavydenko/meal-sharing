import React from "react";
import { useParams } from "react-router-dom";
import { useState, useEffect } from "react";

const MealById = () => {
const [meal, setMeal] = useState([]);
const {id} = useParams();
useEffect(() => {
    fetch(`http://localhost:5000/api/meals/${id}`)
      .then((response) => response.json())
      .then((data) => setMeal(data))
      .catch((error) => console.log(error));
  }, []);
  console.log(meal);

  return (
    <div className="meal-grid">
      {meal.map((item) => (
        <div key={item.id}>
        <p>{item.title}</p>
        <p>{item.description}</p>
        <p>{item.location}</p>
        <p>{item.price}</p>

        </div>


        
      ))}
    </div>
  );
};


export default MealById;