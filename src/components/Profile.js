import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { Row, Col, Typography, Card } from "antd";
import axios from "axios";

const { Title, Text } = Typography;

const ProfilePage = () => {
    const [userData, setUserData] = useState(null);

    useEffect(() => {
        const fetchUserData = async () => {
            const response = await axios.get("/api/user");
            setUserData(response.data);
        };
        fetchUserData();
    }, []);

    if (!userData) {
        return <div>Loading...</div>;
    }

    return (
        <div className="container">
            <Row gutter={[24, 24]}>
                <Col span={24} md={8} lg={6}>
                    <Card hoverable>
                        <img alt={userData.displayName} src={userData.photoURL} />
                        <div className="card-content">
                            <Title level={4}>{userData.displayName}</Title>
                            <Text>{userData.email}</Text>
                        </div>
                    </Card>
                </Col>
                <Col span={24} md={16} lg={18}>
                    <Row gutter={[24, 24]}>
                        <Col xs={24} sm={12} lg={6}>
                            <Card hoverable>
                                <Text strong>Recipes Created</Text>
                                <br />
                                <Text>{userData.recipes.length}</Text>
                            </Card>
                        </Col>
                        <Col xs={24} sm={12} lg={6}>
                            <Card hoverable>
                                <Text strong>Recipes Favorited</Text>
                                <br />
                                <Text>{userData.favorites.length}</Text>
                            </Card>
                        </Col>
                        <Col xs={24} sm={12} lg={6}>
                            <Card hoverable>
                                <Text strong>Followers</Text>
                                <br />
                                <Text>{userData.followers.length}</Text>
                            </Card>
                        </Col>
                        <Col xs={24} sm={12} lg={6}>
                            <Card hoverable>
                                <Text strong>Following</Text>
                                <br />
                                <Text>{userData.following.length}</Text>
                            </Card>
                        </Col>
                    </Row>
                </Col>
            </Row>
            <div className="update-profile-link">
                <Link to="/update-profile">Update Profile</Link>
            </div>
        </div>
    );
};

export default ProfilePage;
