import React, { useState, useEffect } from "react";
import { BrowserRouter, Link } from "react-router-dom";
import { Row, Col, Card } from "antd";
import "./RecipeList.css";

const { Meta } = Card;

const RecipeList = () => {
  const [recipes, setRecipes] = useState([]);

  useEffect(() => {
    const fetchRecipes = async () => {
      try {
        const response = await fetch("http://localhost:3000/recipes");
        const data = await response.json();
        setRecipes(data);
      } catch (error) {
        console.error(error);
      }
    };

    fetchRecipes();
  }, []);

  console.log(recipes.map((recipe) => recipe));

  return (
    <BrowserRouter>
      <Row gutter={[24, 24]} className="cardRow">
        {recipes.map((recipe) => (
          <Col key={recipe.id} xs={24} sm={12} md={8} lg={6} className="Col">
            <Link to={`/recipes/${recipe.id}`}>
              <Card
                hoverable
                cover={
                  <img
                    alt={recipe.title}
                    src={recipe.image}
                    className="cardImage"
                  />
                }
              >
                <Meta title={recipe.title} description={recipe.description} />
                <p>Cuisine: {recipe.cuisine}</p>
              </Card>
            </Link>
          </Col>
        ))}
      </Row>
    </BrowserRouter>
  );
};

export { RecipeList };
