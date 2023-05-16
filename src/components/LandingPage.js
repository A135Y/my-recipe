import { Button, Typography, Row, Col } from "antd";
import React, { useState } from "react";
import recipe1 from "../images/cinnamon-rolls.jpeg";
import recipe2 from "../images/vanilla-cheesecake.jpeg";
import recipe3 from "../images/Crumble-Churro-Cookies.jpeg";
import logo from "../images/logo.jpg";
import { LogIn } from "./LogIn";
import "./LandingPage.css";
import { Register } from "./Register";

const LandingPage = () => {
  const [showLogin, setShowLogin] = useState(false);
  const [showRegister, setShowRegister] = useState(false);

  const handleLogIn = () => {
    setShowLogin(true);
  };

  const handleSignup = () => {
    setShowRegister(true);
  };

  if (showLogin) {
    return <LogIn />;
  }

  if (showRegister) {
    return <Register />;
  }

  return (
    <div className="landing-page">
      {/* Navigation Bar */}
      <div className="nav-bar">
        <div className="header">
          <img src={logo} alt="MyRecipes" className="logo" />
          <div className="buttons">
            <Button className="login-button" onClick={handleLogIn}>
              Login
            </Button>
            <Button className="signup-button" onClick={handleSignup}>
              Sign Up
            </Button>
          </div>
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
                <Button className="recipe-button" onClick={handleLogIn}>
                  View Recipe
                </Button>
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
                <Button className="recipe-button" onClick={handleLogIn}>
                  View Recipe
                </Button>
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
                <Button className="recipe-button" onClick={handleLogIn}>
                  View Recipe
                </Button>
              </div>
            </div>
          </Col>
        </Row>
      </div>
    </div>
  );
};
export { LandingPage };
