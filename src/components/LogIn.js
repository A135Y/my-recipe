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

const LogIn = () => {
  const [form] = Form.useForm();
  const [loading, setLoading] = useState(false);
  // const [showPassword, setShowPassword] = useState(false);

  const handleLogin = (values) => {
    setLoading(true);
    setTimeout(() => {
      message.success("Login successful");
      setLoading(false);
    }, 2000);
  };

  return (
    <Row justify="center" align="middle" style={{ minHeight: "100vh" }}>
      <Col xs={20} md={10} lg={8}>
        <h1 style={{ textAlign: "center" }}>Login to MyRecipePal</h1>
        <Divider />
        <Form form={form} onFinish={handleLogin} layout="vertical">
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
              onKeyPress={(e) => {
                if (e.key === "Enter") {
                  form.submit();
                }
              }}
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
        </Form>
      </Col>
    </Row>
  );
};

export { LogIn };
