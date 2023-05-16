import React, { useState, useEffect } from "react";
import { Button, Input, Layout, Row, Col, Typography } from "antd";
import { SearchOutlined } from "@ant-design/icons";
import { RecipeList } from "./RecipeList";
import { RecipePagination } from "./RecipePagination";
import { SearchResults } from "./SearchResults";
import "./Home.css";
import logo from "../images/logo.jpg";

const { Title } = Typography;
const { Content } = Layout;

const Home = () => {
  const [recipes, setRecipes] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [showExtraText, setShowExtraText] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalRecipes, setTotalRecipes] = useState(0); // Add totalRecipes state

  useEffect(() => {
    const fetchRecipes = async () => {
      try {
        const response = await fetch(
          `http://localhost:3000/recipes?page=${currentPage}`
        );
        const data = await response.json();
        setRecipes(data.recipes);
        setTotalRecipes(data.totalCount); // Update totalRecipes state
      } catch (error) {
        console.error(error);
      }
    };
    fetchRecipes();
  }, [currentPage]); // Add currentPage as a dependency

  const handleSearch = (e) => {
    setSearchQuery(e.target.value);
    setShowExtraText(false);
  };

  const handleGoBack = () => {
    setSearchQuery("");
    setShowExtraText(false);
  };

  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

  return (
    <Layout className="homeLayout">
      <div className="nav-bar">
        <div className="header">
          <img src={logo} alt="MyRecipes" className="logo" />
        </div>
      </div>
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
        {searchQuery === "" ? (
          <RecipeList
            currentPage={currentPage}
            pageSize={12}
            recipes={recipes}
          />
        ) : (
          <SearchResults
            recipes={recipes}
            searchQuery={searchQuery}
            setShowExtraText={setShowExtraText}
          />
        )}
        {showExtraText && (
          <div style={{ textAlign: "center", marginTop: "3em" }}>
            <p>We apologize for not having what you're looking for </p>
            <span role="img" aria-label="sad face" style={{ fontSize: "3em" }}>
              😞
            </span>
            <p>
              You can add the recipe you're looking for by following the button
              below
            </p>
            <Button type="primary" size="large">
              Add Recipe
            </Button>
            <br />
            <br />
            <Button onClick={handleGoBack}>Go back</Button>
          </div>
        )}
        <RecipePagination
          total={totalRecipes} // Use totalRecipes state as the total value
          pageSize={12}
          current={currentPage}
          onChange={handlePageChange}
          showSizeChanger={false}
        />
      </Content>
    </Layout>
  );
};

export { Home };
