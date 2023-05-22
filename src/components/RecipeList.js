import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { Row, Col, Card } from "antd";
import "./RecipeList.css";

const { Meta } = Card;

const RecipeList = ({ recipes }) => {
  const [selectedRecipe, setSelectedRecipe] = useState(null);

  const handleRecipeClick = (recipe) => {
    if (selectedRecipe === recipe) {
      setSelectedRecipe(null);
    } else {
      setSelectedRecipe(recipe);
    }
  };

  useEffect(() => {
    setSelectedRecipe(null);
  }, [recipes]);

  return (
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
              <Meta
                title={recipe.title}
                description={
                  selectedRecipe === recipe
                    ? recipe.description
                    : `${recipe.description.substring(0, 70)}...`
                }
              />
              <p>Cuisine: {recipe.cuisine}</p>
              <a href="/recipe" onClick={() => handleRecipeClick(recipe)}>
                {selectedRecipe === recipe ? "See Less" : "See More"}
              </a>
            </Card>
          </Link>
        </Col>
      ))}
    </Row>
  );
};

export { RecipeList };
