import React from "react";
import { Card, Row, Col } from "antd";
import { Link } from "react-router-dom";

const { Meta } = Card;

const RecipeList = ({ recipes }) => {
    return (
        <Row gutter={[24, 24]}>
            {/* {recipes.map((recipe) => (
                <Col key={recipe.id} xs={24} sm={12} md={8} lg={6}>
                    <Link to={`/recipe/${recipe.id}`}>
                        <Card hoverable cover={<img alt={recipe.title} src={recipe.image_url} />}>
                            <Meta title={recipe.title} description={recipe.description} />
                        </Card>
                    </Link>
                </Col>
            ))} */}
        </Row>
    );
};

export { RecipeList }
