import React, { useMemo, useState, useEffect} from "react"; 
import { useNavigate } from "react-router-dom";
import dishesData from "../../data/dishes.json";
import Tabs from "../../components/Tabs";
import SearchBar from "../../components/SearchBar";
import Filters from "../../components/Filters";
import DishCard from "../../components/DishCard";
import DishList from "../../components/DishList";
import "./index.css";

const MEAL_TABS = ["Starter", "Main Course", "Dessert", "Sides"];
const normalizeMeal = (s) => s.toUpperCase();

const Home=() =>{
  const [activeTab, setActiveTab] = useState("Main Course");
  const [search, setSearch] = useState("");
  const [vegFilter, setVegFilter] = useState(true);
  const [nonVegFilter, setNonVegFilter] = useState(true);
  const [selected, setSelected] = useState({});
  const [data, setData] = useState([]); // ✅ store array of selected dishes
  const [showDishList, setShowDishList] = useState(false); // ✅ control visibility
  const navigate = useNavigate();
  // Step 1: Filter dishes by tab
  const dishesByActive = useMemo(() => {
    const target = normalizeMeal(activeTab);
    return dishesData.filter((d) => normalizeMeal(d.mealType) === target);
  }, [activeTab]);

  // Step 2: Apply search + veg/nonveg filters
  const filteredList = useMemo(() => {
    return dishesByActive.filter((d) => {
      if (search.trim()) {
        const q = search.toLowerCase();
        if (!d.name.toLowerCase().includes(q)) return false;
      }
      if (!vegFilter && d.type === "VEG") return false;
      if (!nonVegFilter && d.type !== "VEG") return false;
      return true;
    });
  }, [dishesByActive, search, vegFilter, nonVegFilter]);

  // Step 3: Group by cuisine
  const groupedByCuisine = useMemo(() => {
    return filteredList.reduce((acc, dish) => {
      const cuisineName = dish.category?.name || "Other";
      if (!acc[cuisineName]) acc[cuisineName] = [];
      acc[cuisineName].push(dish);
      return acc;
    }, {});
  }, [filteredList]);

  // ✅ Toggle select
  const toggleSelect = (id) =>
    setSelected((prev) => ({ ...prev, [id]: !prev[id] }));

  // ✅ Update selected data
  useEffect(() => {
    const getData = dishesData.filter((d) => selected[d.id]);
    setData(getData);
  }, [selected]);

  // ✅ Handle continue
  const handleContinue = () => {
    console.log("Continue clicked with selected dishes:", data);
    setShowDishList(true);
  };

  // ✅ Counts per tab
  const countsPerTab = MEAL_TABS.reduce((acc, tab) => {
    const target = normalizeMeal(tab);
    acc[tab] = dishesData.filter(
      (d) => normalizeMeal(d.mealType) === target && selected[d.id]
    ).length;
    return acc;
  }, {});

  const totalSelected = Object.values(selected).filter(Boolean).length;

  return (
    <div className="container">
      <h1>Party Menu</h1>
      <SearchBar value={search} onChange={setSearch} />
      <Tabs
        tabs={MEAL_TABS}
        active={activeTab}
        onChange={setActiveTab}
        counts={countsPerTab}
      />
      <Filters
        veg={vegFilter}
        nonVeg={nonVegFilter}
        setVeg={setVegFilter}
        setNonVeg={setNonVegFilter}
        active={activeTab}
        counts={countsPerTab}
      />

      {/* ✅ Show grouped dishes normally */}
      {!showDishList && (
        <div className="dish-grid">
          {Object.keys(groupedByCuisine).length === 0 ? (
            <div className="empty">No dishes found</div>
          ) : (
            Object.entries(groupedByCuisine).map(([cuisine, dishes]) => (
              <div key={cuisine} className="cuisine-block">
                <div className="north-indian-con">
                  <h3>{cuisine}</h3>
                  <img
                    src="https://res.cloudinary.com/doyaebals/image/upload/v1757840526/Group_1000007396_yng9or.png"
                    alt={`${cuisine} Cuisine`}
                    className="north-indian-image"
                  />
                </div>
                {dishes.map((dish) => (
                  <DishCard
                    key={dish.id}
                    dish={dish}
                    data={data}
                    type={dish.type}
                    selected={!!selected[dish.id]}
                    onToggle={() => toggleSelect(dish.id)}
                  />
                ))}
              </div>
            ))
          )}
        </div>
      )}

      {/* ✅ Show DishList after continue */}
      {showDishList && <DishList data={data} onToggle={(id) => {
      // Optional: allow removing dishes from the list
      setSelected((prev) => ({ ...prev, [id]: false }));
      }} />}

      {/* ✅ Summary bar */}
      <footer className="summary-bar">
        
        <div className="summary-info">
           <button onClick={() => navigate(-1)} className="back-btn">←</button>
          <p>Total Dish Selected {totalSelected}</p>
          <img
            src="https://res.cloudinary.com/doyaebals/image/upload/v1757858768/Group_1000007396_1_nwwbet.png"
            alt="Selected Dishes"
            className="selected-dishes-icon"
          />
        </div>
        
          <button className="continue-btn" onClick={handleContinue}>
            Continue
          </button>
      
      </footer>
    </div>
  );
}
export default Home;