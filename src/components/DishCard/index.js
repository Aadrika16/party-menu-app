import React from "react";
import { Link } from "react-router-dom";
import "./index.css";

const DishCard = ({ dish, selected, onToggle,type}) => {
  return (
        <div className={`dish-card ${selected ? "selected" : ""}`} role="article">
          <div className="dish-body">
            <div className="dish-type-icon">
              <h3>{dish.name}</h3>
              {type === "VEG" ? (
                <img src="https://res.cloudinary.com/doyaebals/image/upload/v1757849527/Frame_19479_1_tpr4lj.png" alt="veg-icon" className="veg-icon" />
              ) : (
                <img src="https://res.cloudinary.com/doyaebals/image/upload/v1757849435/Frame_19479_cq86vy.png" alt="non-veg-icon" className="non-veg-icon" />
              )}
            </div>
            <p>{dish.description}</p>
            <div className="dish-actions">
              <img src="https://res.cloudinary.com/doyaebals/image/upload/v1757860250/Group_sk1r3b.png" alt="action-icon" className="action-icon" />
              <Link to={`/ingredient/${dish.id}`} className="ingredient-link">
                Ingredient
              </Link>
            </div>
          </div>
          <div className="dish-image">
              {dish.image && (
                <div className="dish-image-container">
                  <img src={dish.image} alt={dish.name}  className="dish-image"/>
                  <button onClick={onToggle} className={`add-remove-button ${selected ? "remove" : ""}`}>{selected ? "Remove" : "Add+"}</button>
                 </div>
              ) 
            }
          </div>
        </div>
    
  );
}
export default DishCard;