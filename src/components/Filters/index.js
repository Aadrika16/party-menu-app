import React from "react";
import "./index.css"

const Filters = ({ veg, nonVeg, setVeg, setNonVeg, active ,counts}) => {
  return (
    <div className="filters-container">
      <h3 className="active-tab-heading">{`${active}s Selected (${counts[active] || 0})`}</h3>
      <div className="label-container">
        <label>
          <button type="button" className={`filter-button ${veg ? "active" : ""}`} onClick={() => setVeg(!veg)} >
            <img src="https://res.cloudinary.com/doyaebals/image/upload/v1757835233/Frame_19480_fqt3jt.png" alt="veg icon" className="veg-icon"/>
          </button>
        </label>
        <label>
          <button type="button" className={`filter-button ${nonVeg ? "active" : ""}`} onClick={() => setNonVeg(!nonVeg)} >
            <img src="https://res.cloudinary.com/doyaebals/image/upload/v1757835241/Frame_1000008679_hotab3.png" alt="non-veg icon" className="non-veg-icon"/>
          </button>
        </label>
      </div>
    </div>
  );
}
export default Filters;
         