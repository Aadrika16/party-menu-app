import React from "react";
import "./index.css"

const Tabs = ({ tabs, active, onChange, counts = {} }) => { 
  
  return (
    <div className="tabs">
      <div>
        {tabs.map((t) => (
          <button
            key={t}
            className={`tab ${t === active ? "active" : ""}`}
            onClick={() => onChange(t)}
          >
            {t} <span className="count">{counts[t] || 0}</span>
          </button>
        ))}
      </div>
    </div>
  );
}
export default Tabs;