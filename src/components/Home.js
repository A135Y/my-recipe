import React from "react";
import { Button, Input, Layout, Row, Col, Typography } from "antd";
import { SearchOutlined } from "@ant-design/icons";
import "./Home.css";

const { Title } = Typography;
const { Header, Content } = Layout;

const Home = () => {
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
            />
          </Col>
        </Row>
      </Content>
    </Layout>
  );
};

export { Home };
