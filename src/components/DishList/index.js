import React, { useState } from "react";

import DishCard from "../DishCard";
import DishModal from "../DishModal";
import "./index.css";

const DishList = ({ data, onToggle }) => {
  
  const [selectedDish, setSelectedDish] = useState(null);

  if (!data || data.length === 0) {
    return <div className="dish-list-empty">No dishes selected</div>;
  }

  

  return (
    <div className="dish-list-container">
      <div className="dish-list-heading">Selected Dishes</div>
     
      <div className="dish-list-grid">
        {data.map((dish) => (
          <div
            key={dish.id}
            onClick={() => setSelectedDish(dish)} // open modal
          >
            <DishCard
              dish={dish}
              type={dish.type}
              selected={true} // always selected in this view
              onToggle={() => onToggle && onToggle(dish.id)}
            />
          </div>
        ))}
      </div>

      {/* Modal */}
      {selectedDish && (
        <DishModal
          dish={selectedDish}
          onClose={() => setSelectedDish(null)}
          onRemove={() => {
            onToggle && onToggle(selectedDish.id);
            setSelectedDish(null);
          }}
        />
      )}
    </div>
  );
};

export default DishList;
