import React from "react";
import { useParams, useNavigate } from "react-router-dom";
import dishes from "../../data/dishes.json";
import "./index.css";

export default function Ingredient() {
  const { id } = useParams();
  const navigate = useNavigate();
  const dish = dishes.find((d) => d.id === Number(id));

  if (!dish) return <div>Dish not found</div>;

  const ingredients = dish.ingredients || [];

  return (
    <div className="ingredient-container">
      {/* Back header */}
      <div className="header">
        <button onClick={() => navigate(-1)} className="back-btn">←</button>
        <h3>Ingredient list</h3>
      </div>

      {/* Dish Info */}
      <div className="dish-info">
        <div className="dish-text">
          <h2>{dish.name}</h2>
          <p>{dish.description}</p>
        </div>
        <div className="dish-image-wrapper">
          <img src={dish.image} alt={dish.name} className="dish-img" />
        </div>
      </div>

      {/* Ingredients */}
      <h4 className="ingredients-title">Ingredients</h4>
      <p className="for-people">For 2 people</p>

      <ul className="ingredients-list">
        {ingredients.map((ing, i) => (
          <li key={i}>
            <span className="ing-name">{ing.name}</span>
            <span className="ing-qty">{ing.quantity}</span>
          </li>
        ))}
      </ul>
    </div>
  );
}
