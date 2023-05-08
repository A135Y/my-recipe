import React, { useState, useEffect } from 'react';
import { Row, Col, Typography } from 'antd';
import RecipeCard from '../components/RecipeCard';
import { useAuth } from '../contexts/AuthContext';
// import { getRecipes } from '../utils/api';
// import { Recipe } from '../utils/types';

const { Title } = Typography;

const Recipes = () => {
    // const [recipes, setRecipes] = useState < Recipe[] > ([]);
    const { currentUser } = useAuth();

    useEffect(() => {
        const fetchRecipes = async () => {
            try {
                const fetchedRecipes = await getRecipes();
                setRecipes(fetchedRecipes);
            } catch (error) {
                console.error(error);
            }
        };

        fetchRecipes();
    }, []);

    return (
        <div style={{ padding: '24px' }}>
            <Title level={2} style={{ textAlign: 'center', marginBottom: '24px' }}>
                All Recipes
            </Title>
            <Row gutter={[24, 24]}>
                {recipes.map((recipe) => (
                    <Col key={recipe.id} xs={24} sm={12} md={8} lg={6}>
                        <RecipeCard recipe={recipe} />
                    </Col>
                ))}
            </Row>
        </div>
    );
};

export default Recipes;
