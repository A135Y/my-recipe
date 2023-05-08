import React from 'react';
import { Button, Input, Layout, Row, Col, Typography } from 'antd';
import { SearchOutlined } from '@ant-design/icons';
import { RecipeList } from './RecipeList';

const { Title } = Typography;
const { Header, Content } = Layout;

const Home = () => {
    return (
        <Layout>
            <Header>
                <Row justify="space-between" align="middle">
                    <Col>
                        <Title level={2} style={{ color: '#fff', marginBottom: 0 }}>
                            My Recipe
                        </Title>
                    </Col>
                    <Col>
                        <Button type="primary">Sign up</Button>
                    </Col>
                </Row>
            </Header>
            <Content style={{ marginTop: '2rem' }}>
                <Row justify="center" align="middle">
                    <Col xs={20} md={12}>
                        <Title level={1} style={{ textAlign: 'center', marginBottom: '3rem' }}>
                            Welcome to My Recipe
                        </Title>
                        <Input
                            size="large"
                            placeholder="Search for recipes"
                            prefix={<SearchOutlined />}
                            style={{ marginBottom: '2rem' }}
                        />
                    </Col>
                </Row>
            </Content>
            <RecipeList />
        </Layout>
    );
};

export default Home;
