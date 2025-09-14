import React from "react";
import "./index.css";

export default function SearchBar({ value, onChange }) {
  return (
    <div className="search-container">
      <img src="https://res.cloudinary.com/doyaebals/image/upload/v1757824232/less-than_s83g38.png" alt="left arrow" className="left-arrow"/>
      <input
        value={value}
        className="search"
        onChange={(e) => onChange(e.target.value)}
        placeholder="Search dish for party....."
        aria-label="Search dishes"
      />
      <img src="https://res.cloudinary.com/doyaebals/image/upload/v1757823948/search_vh2x3e.png" alt="search icon" className="search-icon"/>
    </div>
  );
}
