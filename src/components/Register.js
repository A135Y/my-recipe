import React, { useState } from "react";
import { Form, Input, Button, message, Row, Col, Divider } from "antd";
import {
  UserOutlined,
  MailOutlined,
  EyeInvisibleOutlined,
  EyeTwoTone,
  LockOutlined,
} from "@ant-design/icons";
import { useNavigate } from "react-router-dom";

const Register = () => {
  const [form] = Form.useForm();
  const [loading, setLoading] = useState(false);
  const [bio, setBio] = useState("");
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const onFinish = async () => {
    setLoading(true);

    try {
      const user = {
        username,
        email,
        password,
        bio,
      };

      const response = await fetch("http://localhost:3000/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(user),
      });

      console.log("response: ", response);
      if (response.ok) {
        message.success("Registration successful");
        form.resetFields();
        navigate("/"); // Redirect to "/home" endpoint
      } else if (response.status === 400) {
        const responseData = await response.json();
        const fieldErrors = [];
        for (const field in responseData.errors) {
          const errors = responseData.errors[field];
          fieldErrors.push({
            name: field,
            errors: Array.isArray(errors) ? errors : [errors],
          });
        }
        form.setFields(fieldErrors);
      } else {
        console.error("Registration failed");
        message.error("Registration failed");
      }
    } catch (error) {
      console.error(error);
      message.error("Registration failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <Row justify="center" align="middle" style={{ minHeight: "100vh" }}>
      <Col xs={20} md={10} lg={8}>
        <h1 style={{ textAlign: "center" }}>Register for MyRecipePal</h1>
        <Divider />
        <Form
          form={form}
          onFinish={onFinish}
          layout="vertical"
          scrollToFirstError
        >
          <Form.Item
            name="username"
            label="Username"
            tooltip="What do you want others to call you?"
            rules={[
              {
                required: true,
                message: "Please input your username!",
                whitespace: true,
              },
            ]}
          >
            <Input
              prefix={<UserOutlined />}
              placeholder="Enter your username"
              autoFocus
              disabled={loading}
              onChange={(event) => setUsername(event.target.value)}
            />
          </Form.Item>
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
              disabled={loading}
              onChange={(event) => setEmail(event.target.value)}
            />
          </Form.Item>
          <Form.Item
            name="password"
            label="Password"
            rules={[
              {
                required: true,
                message: "Please enter your password",
              },
              {
                min: 8,
                message: "Password must be at least 8 characters",
              },
              {
                // Regex for password with at least one uppercase letter, one lowercase letter, and one number
                pattern: /^(?=.*[a-z])/,
                message: "Password must contain at least one lowercase letter",
              },
              {
                // Regex for password with at least one lowercase letter
                pattern: /^(?=.*[A-Z])/,
                message: "Password must contain at least one uppercase letter",
              },
              {
                // Regex for password with at least one number
                pattern: /^(?=.*\d)/,
                message: "Password must contain at least one number",
              },
              {
                // Regex for password with at least one special character
                pattern: /[\W_]/,
                message: "Password must contain at least one special character",
              },
            ]}
          >
            <Input.Password
              prefix={<LockOutlined />}
              placeholder="Enter your password"
              disabled={loading}
              iconRender={(visible) =>
                visible ? <EyeTwoTone /> : <EyeInvisibleOutlined />
              }
              onChange={(event) => setPassword(event.target.value)}
            />
          </Form.Item>
          <Form.Item
            name="confirmPassword"
            label="Confirm Password"
            dependencies={["password"]}
            rules={[
              {
                required: true,
                message: "Please confirm your password",
              },
              ({ getFieldValue }) => ({
                validator(_, value) {
                  if (!value || getFieldValue("password") === value) {
                    return Promise.resolve();
                  }

                  return Promise.reject(
                    new Error("The two passwords do not match")
                  );
                },
              }),
            ]}
          >
            <Input.Password
              prefix={<LockOutlined />}
              placeholder="Confirm your password"
              disabled={loading}
              iconRender={(visible) =>
                visible ? <EyeTwoTone /> : <EyeInvisibleOutlined />
              }
            />
          </Form.Item>
          <Form.Item
            name="bio"
            label="Bio"
            rules={[
              {
                max: 256,
                message: "Bio must be 256 characters or less",
              },
            ]}
          >
            <Input.TextArea
              rows={4}
              value={bio}
              onChange={(event) => setBio(event.target.value)}
              placeholder="Tell us about yourself"
              disabled={loading}
            />
          </Form.Item>
          <Form.Item>
            <Button type="primary" htmlType="submit" loading={loading}>
              Register
            </Button>
          </Form.Item>
        </Form>
      </Col>
    </Row>
  );
};

export { Register };
