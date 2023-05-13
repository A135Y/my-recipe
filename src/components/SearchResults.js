import React from 'react';
import { Card, Col, Row } from 'antd';

const SearchResults = ({ recipes, searchQuery, setShowExtraText }) => {
    // Filter the recipes based on the search query
    const filteredRecipes = recipes.filter(
        (recipe) =>
            recipe.title.toLowerCase().includes(searchQuery.toLowerCase())
    );

    if (filteredRecipes.length === 0) {
        setShowExtraText(true);
    } else {
        setShowExtraText(false);
    }

    return (
        <Row gutter={[24, 24]}>
            {filteredRecipes.map((recipe) => (
                <Col key={recipe.id} xs={24} sm={12} md={8} lg={6} className="Col">
                    <Card
                        hoverable
                        cover={<img alt={recipe.title} src={recipe.image} className="cardImage" />}
                    >
                        <Card.Meta title={recipe.title} description={recipe.description} />
                        <p>Cuisine: {recipe.cuisine}</p>
                    </Card>
                </Col>
            ))}
        </Row>
    );
};

export { SearchResults };
