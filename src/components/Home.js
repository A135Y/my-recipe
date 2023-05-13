import React, { useState, useEffect } from 'react';
import { Button, Input, Layout, Row, Col, Typography } from 'antd';
import { SearchOutlined } from '@ant-design/icons';
import './Home.css';
import { RecipeList } from './RecipeList';
import { SearchResults } from './SearchResults';

const { Title } = Typography;
const { Header, Content } = Layout;

const Home = () => {
    const [recipes, setRecipes] = useState([]);
    const [searchQuery, setSearchQuery] = useState('');
    const [showExtraText, setShowExtraText] = useState(false);

    useEffect(() => {
        const fetchRecipes = async () => {
            try {
                const response = await fetch('http://localhost:3000/recipes');
                const data = await response.json();
                setRecipes(data);
            } catch (error) {
                console.error(error);
            }
        };

        fetchRecipes();
    }, []);

    const handleSearch = (e) => {
        setSearchQuery(e.target.value);
        setShowExtraText(false);
    };

    const handleGoBack = () => {
        setSearchQuery('');
        setShowExtraText(false);
    };

    return (
        <Layout className="homeLayout">
            <Header className="homeHeader">
                <Row justify="space-between" align="middle">
                    <Col>
                        <Title level={2} className="homeTitle">
                            My Recipe
                        </Title>
                    </Col>
                    <Col>
                        <Button type="primary">Sign up</Button>
                    </Col>
                </Row>
            </Header>
            <Content className="homeContent">
                <Row justify="center" align="middle">
                    <Col xs={20} md={12}>
                        <Title level={1} className="homeSubTitle">
                            Welcome to My Recipe
                        </Title>
                        <Input
                            size="large"
                            placeholder="Search for recipes"
                            prefix={<SearchOutlined />}
                            className="homeSearch"
                            onChange={handleSearch}
                        />
                    </Col>
                </Row>
                {searchQuery === '' ? (
                    <RecipeList recipes={recipes} />
                ) : (
                    <SearchResults
                        recipes={recipes}
                        searchQuery={searchQuery}
                        setShowExtraText={setShowExtraText}
                    />
                )}
                {showExtraText && (
                    <div style={{ textAlign: 'center', marginTop: '3em' }}>
                        <p>We apologize for not having what you're looking for </p>
                        <span role="img" aria-label="sad face" style={{ fontSize: '3em' }}>
                            😞
                        </span>
                        <p>You can add the recipe you're looking for by following the button below</p>
                        <Button type="primary" size="large">
                            Add Recipe
                        </Button>
                        <br />
                        <br />
                        <Button onClick={handleGoBack}>Go back</Button>
                    </div>
                )}
            </Content>
        </Layout>
    );
};

export { Home };
