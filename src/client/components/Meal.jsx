import React from "react";
import "./mealStyle.css";

const Meal = ({ meal }) => {
  return (
    <div className="meal-card">
      <img src={meal.image} alt={meal.title} className="meal-image" />
      <div className="meal-details">
        <h3 className="meal-title">{meal.title}</h3>
        <p className="meal-description">{meal.description}</p>
        <p className="meal-price">Price: {meal.price}</p>
        <p className="meal-max-reservations">
          Max Reservations: {meal.max_reservations}
        </p>
      </div>
    </div>
  );
};

export default Meal;
