import React, { useState, useEffect } from "react";
import { BrowserRouter, Link } from "react-router-dom";
import { Row, Col, Card } from "antd";
import "./RecipeList.css";
import { RecipePagination } from "./RecipePagination";

const { Meta } = Card;

const RecipeList = () => {
    const [recipes, setRecipes] = useState([]);
    const [selectedRecipe, setSelectedRecipe] = useState(null);

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

    const handleRecipeClick = (recipe) => {
        if (selectedRecipe === recipe) {
            setSelectedRecipe(null);
        } else {
            setSelectedRecipe(recipe);
        }
    };

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
                                <Meta
                                    title={recipe.title}
                                    description={
                                        selectedRecipe === recipe
                                            ? recipe.description
                                            : `${recipe.description.substring(0, 70)}...`}
                                />
                                <p>Cuisine: {recipe.cuisine}</p>
                                <a onClick={() => handleRecipeClick(recipe)}>
                                    {selectedRecipe === recipe ? "See Less" : "See More"}
                                </a>
                            </Card>
                        </Link>
                    </Col>
                ))}
            </Row>
            <RecipePagination
                total={recipes.length}
                pageSize={8}
                current={1}
                onChange={() => { }
                }
                showSizeChanger={false}
            />
        </BrowserRouter>
    );
};

export { RecipeList };
