import React, { useState } from "react";
import {
  Form,
  Input,
  Button,
  Checkbox,
  Row,
  Col,
  Divider,
  message,
} from "antd";
import {
  UserOutlined,
  LockOutlined,
  MailOutlined,
  EyeInvisibleOutlined,
  EyeTwoTone,
} from "@ant-design/icons";
import { GoogleLogin } from "@react-oauth/google";
import { useNavigate } from "react-router-dom";
const envVariables = process.env;
const GOOGLE_CLIENT_ID = envVariables.REACT_APP_GOOGLE_CLIENT_ID;

const LogIn = () => {
  const [form] = Form.useForm();
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const onFinish = async () => {
    setLoading(true);

    try {
      const user = { email, password };

      const response = await fetch("http://localhost:3000/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(user),
      });

      if (response.ok) {
        const data = await response.json();
        const token = data.token;
        console.log("token: ", token);
        // Save the token to local storage or state, depending on your application
        localStorage.setItem("token", token); // Example: storing the token in local storage

        message.success("Login successful");
        setLoading(false);
        navigate("/home"); // Redirect to "/home" endpoint
      } else if (response.status === 400) {
        const errorData = await response.json();
        const errorMessage = Array.isArray(errorData)
          ? errorData[0].message
          : errorData;
        message.error(errorMessage);
        setLoading(false);
      } else {
        console.error("Login failed");
        message.error("Login failed");
        setLoading(false);
      }
    } catch (error) {
      console.error(error);
      message.error("Login failed");
      setLoading(false);
    }
  };

  const responseGoogle = (response) => {
    console.log(response);
  };

  return (
    <Row justify="center" align="middle" style={{ minHeight: "100vh" }}>
      <Col xs={20} md={10} lg={8}>
        <h1 style={{ textAlign: "center" }}>Login to MyRecipePal</h1>
        <Divider />
        <Form form={form} onFinish={onFinish} layout="vertical">
          <Form.Item
            name="email"
            label="Email"
            rules={[
              {
                required: true,
                message: "Please enter your email address",
              },
              {
                type: "email",
                message: "Please enter a valid email address",
              },
            ]}
          >
            <Input
              prefix={<MailOutlined />}
              placeholder="Enter your email"
              autoFocus
              disabled={loading}
              onChange={(e) => setEmail(e.target.value)}
            />
          </Form.Item>
          <Form.Item
            name="password"
            label="Password"
            rules={[{ required: true, message: "Please enter your password" }]}
          >
            <Input.Password
              prefix={<LockOutlined />}
              placeholder="Enter your password"
              iconRender={(visible) =>
                visible ? <EyeTwoTone /> : <EyeInvisibleOutlined />
              }
              disabled={loading}
              onChange={(e) => setPassword(e.target.value)}
            />
          </Form.Item>
          <Form.Item>
            <Checkbox disabled={loading}>Remember me</Checkbox>
            <a href="/remember-me" style={{ float: "right" }}>
              Forgot password
            </a>
          </Form.Item>
          <Form.Item>
            <Button
              type="primary"
              htmlType="submit"
              block
              loading={loading}
              icon={<UserOutlined />}
            >
              Login
            </Button>
          </Form.Item>
          <GoogleLogin
            clientId={GOOGLE_CLIENT_ID}
            buttonText="Login with Google"
            onSuccess={responseGoogle}
            onFailure={responseGoogle}
            cookiePolicy={"single_host_origin"}
          />{" "}
          <div>
            Don't have an account?{" "}
            <button
              className="signup-button"
              onClick={() => navigate("/register")}
            >
              Sign Up
            </button>
          </div>
        </Form>
      </Col>
    </Row>
  );
};

export { LogIn };
