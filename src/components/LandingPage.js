import React, { useState } from "react";
import { Typography, Row, Col } from "antd";
import recipe1 from "../images/cinnamon-rolls.jpeg";
import recipe2 from "../images/vanilla-cheesecake.jpeg";
import recipe3 from "../images/Crumble-Churro-Cookies.jpeg";
import "./LandingPage.css";
import { useNavigate } from "react-router-dom";

const LandingPage = () => {
  const navigate = useNavigate();
  const [isLoggedIn, setIsLoggedIn] = useState(false); // Add state to track login status

  const handleLogin = () => {
    // Logic for handling login
    setIsLoggedIn(true);
    // Perform any other necessary actions
  };

  const handleLogout = () => {
    // Logic for handling logout
    setIsLoggedIn(false);
    // Perform any other necessary actions
  };

  return (
    <div className="landing-page">
      {/* Navigation Bar */}
      <div className="nav-bar">
        <div className="header">
          {/* ... */}
          {isLoggedIn ? (
            <button className="logout-button" onClick={handleLogout}>
              Logout
            </button>
          ) : (
            <>
              <button
                className="login-button"
                onClick={() => navigate("/login")}
              >
                Login
              </button>
              <button
                className="signup-button"
                onClick={() => navigate("/register")}
              >
                Sign Up
              </button>
            </>
          )}
        </div>
      </div>
      {/* Introduction */}
      <div className="intro">
        <div className="intro-content">
          <Typography.Title level={1} className="intro-title">
            Welcome to MyRecipePal!
          </Typography.Title>
          <Typography.Paragraph className="intro-paragraph">
            MyRecipePal is a community for home chefs to share their favorite
            recipes with the world and discover new ones from others. Whether
            you're an experienced cook or just getting started in the kitchen,
            MyRecipePal is the perfect place to find inspiration and connect
            with like-minded food lovers.
          </Typography.Paragraph>
        </div>
      </div>
      {/* Featured Recipes */}
      <div className="featured-recipes">
        <Typography.Title level={2} className="section-title">
          Featured Recipes
        </Typography.Title>
        <Row gutter={[24, 24]} justify="center">
          <Col xs={24} md={8} lg={6}>
            <div className="recipe-card">
              <img src={recipe1} alt="recipe1" className="recipe-image" />
              <div className="recipe-details">
                <Typography.Title level={4} className="recipe-title">
                  Cinnamon Rolls
                </Typography.Title>
                <button
                  className="recipe-button"
                  onClick={() => navigate("/login")}
                >
                  View Recipe
                </button>
              </div>
            </div>
          </Col>
          <Col xs={24} md={8} lg={6}>
            <div className="recipe-card">
              <img src={recipe2} alt="recipe2" className="recipe-image" />
              <div className="recipe-details">
                <Typography.Title level={4} className="recipe-title">
                  Madagascan Vanilla Cheesecake
                </Typography.Title>
                <button
                  className="recipe-button"
                  onClick={() => navigate("/login")}
                >
                  View Recipe
                </button>
              </div>
            </div>
          </Col>
          <Col xs={24} md={8} lg={6}>
            <div className="recipe-card">
              <img src={recipe3} alt="recipe3" className="recipe-image" />
              <div className="recipe-details">
                <Typography.Title level={4} className="recipe-title">
                  Crumble Churro Cookies
                </Typography.Title>
                <button
                  className="recipe-button"
                  onClick={() => navigate("/login")}
                >
                  View Recipe
                </button>
              </div>
            </div>
          </Col>
        </Row>
      </div>
    </div>
  );
};

export { LandingPage };
