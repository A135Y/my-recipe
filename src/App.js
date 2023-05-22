import React from "react";
import { Home } from "./components/Home";
import { LandingPage } from "./components/LandingPage";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { LogIn } from "./components/LogIn";
import { Register } from "./components/Register";

export default function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/home" element={<Home />} />
        <Route path="/login" element={<LogIn />} />
        <Route path="/register" element={<Register />} />
      </Routes>
    </Router>
  );
}
