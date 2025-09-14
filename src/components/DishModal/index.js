import React from "react";
import { Link } from "react-router-dom";
import "./index.css";

const DishModal = ({ dish, onClose, onRemove }) => {
  return (
    <div className="modal-overlay" onClick={onClose}>
      <div
        className="modal-content"
        onClick={(e) => e.stopPropagation()} // stop background click
      >
        <img src={dish.image} alt={dish.name} className="modal-image" />

        <div className="modal-details">
          <h2>{dish.name}</h2>
          <p><strong>{dish.type}</strong> {dish.description}</p>
          <div className="dish-actions">
              <img src="https://res.cloudinary.com/doyaebals/image/upload/v1757860250/Group_sk1r3b.png" alt="action-icon" className="action-icon" />
              <Link to={`/ingredient/${dish.id}`} className="ingredient-link">
                Ingredient
              </Link>
            </div>
          <div className="modal-actions">
            <button className="remove-btn" onClick={onRemove}>Remove</button>
            <button className="close-btn" onClick={onClose}>Close</button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DishModal;
