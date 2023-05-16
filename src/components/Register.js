import React, { useState } from "react";
import {
  Button,
  Checkbox,
  Form,
  Input,
  Select,
  Row,
  Col,
  Divider,
  message,
  Upload,
} from "antd";
import {
  UserOutlined,
  LockOutlined,
  MailOutlined,
  EyeInvisibleOutlined,
  EyeTwoTone,
  PlusOutlined,
} from "@ant-design/icons";

const { Option } = Select;

const Register = () => {
  const [form] = Form.useForm();
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [bio, setBio] = useState("");
  const [profilePicture, setProfilePicture] = useState(null);

  const onFinish = (values) => {
    setLoading(true);
    setTimeout(() => {
      message.success("Registration successful");
      setLoading(false);
    }, 2000);
  };

  const handleBioChange = (event) => {
    setBio(event.target.value);
  };

  const handleProfilePictureChange = (info) => {
    if (info.file.status === "done") {
      setProfilePicture(info.file.originFileObj);
    }
  };

  const beforeProfilePictureUpload = (file) => {
    const isJpgOrPng = file.type === "image/jpeg" || file.type === "image/png";
    if (!isJpgOrPng) {
      message.error("You can only upload JPG/PNG file!");
    }
    const isLt2M = file.size / 1024 / 1024 < 2;
    if (!isLt2M) {
      message.error("Image must be smaller than 2MB!");
    }
    return isJpgOrPng && isLt2M;
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
            />
          </Form.Item>
          <Form.Item
            name="password"
            label="Password"
            rules={[
              {
                required: true,
                message: "Please enter your password!",
              },
            ]}
            hasFeedback
          >
            <Input.Password
              prefix={<LockOutlined />}
              placeholder="Enter your password"
              iconRender={(visible) =>
                visible ? <EyeTwoTone /> : <EyeInvisibleOutlined />
              }
              disabled={loading}
            />
          </Form.Item>
          <Form.Item
            name="confirm"
            label="Confirm Password"
            dependencies={["password"]}
            hasFeedback
            rules={[
              {
                required: true,
                message: "Please confirm your password!",
              },
              ({ getFieldValue }) => ({
                validator(_, value) {
                  if (!value || getFieldValue("password") === value) {
                    return Promise.resolve();
                  }
                  return Promise.reject(
                    new Error("The two passwords do not match!")
                  );
                },
              }),
            ]}
          >
            <Input.Password
              prefix={<LockOutlined />}
              placeholder="Confirm your password"
              iconRender={(visible) =>
                visible ? <EyeTwoTone /> : <EyeInvisibleOutlined />
              }
              disabled={loading}
            />
          </Form.Item>
          <Form.Item
            name="phone"
            label="Phone Number"
            rules={[
              {
                required: true,
                message: "Please enter your phone number!",
              },
            ]}
          >
            <Input
              style={{ width: "100%" }}
              type="number"
              placeholder="Enter your phone number"
              disabled={loading}
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
              onChange={handleBioChange}
              placeholder="Tell us about yourself"
              disabled={loading}
            />
          </Form.Item>
          <Form.Item
            name="profilePicture"
            label="Profile Picture"
            valuePropName="fileList"
            getValueFromEvent={(e) => e.fileList}
            rules={[
              {
                required: true,
                message: "Please upload your profile picture",
              },
            ]}
          >
            <Upload
              name="profilePicture"
              listType="picture-card"
              showUploadList={false}
              beforeUpload={beforeProfilePictureUpload}
              onChange={handleProfilePictureChange}
              disabled={loading}
            >
              {profilePicture ? (
                <img
                  src={URL.createObjectURL(profilePicture)}
                  alt="profile"
                  style={{ width: "100%" }}
                />
              ) : (
                <div>
                  <PlusOutlined />
                  <div style={{ marginTop: 8 }}>Upload</div>
                </div>
              )}
            </Upload>
          </Form.Item>
          <Form.Item>
            <Checkbox>
              I have read and agree to the <a href="#">terms of service</a> and{" "}
              <a href="#">privacy policy</a>
            </Checkbox>
          </Form.Item>
          <Form.Item>
            <Button type="primary" htmlType="submit" loading={loading} block>
              Register
            </Button>
          </Form.Item>
        </Form>
      </Col>
    </Row>
  );
};

export { Register };
