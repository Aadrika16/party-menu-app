import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Home from "./Pages/Home";
import Ingredient from "./Pages/Ingredient";
import DishList from "./components/DishList";
import "./App.css";

export default function App() {
  return (
    <Router>
      <Routes>
        <Route exact path="/" element={<Home />} />
        <Route path="/ingredient/:id" element={<Ingredient />} />
        <Route path="/dishlist" element={<DishList />} />
      </Routes>
    </Router>
  );
}
