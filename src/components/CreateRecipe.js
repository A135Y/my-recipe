import {
  Form,
  Input,
  Button,
  Typography,
  Row,
  Col,
  Select,
  message,
} from "antd";
import { createRecipe } from "../utils/api";
import { useHistory } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext";

const { Option } = Select;
const { TextArea } = Input;

const CreateRecipe = () => {
  const [loading, setLoading] = useState(false);
  const { currentUser } = useAuth();
  const history = useHistory();

  const onFinish = async (values) => {
    setLoading(true);
    try {
      const newRecipe = {
        title: values.title,
        description: values.description,
        ingredients: values.ingredients,
        steps: values.steps,
        image: values.image,
        cuisine: values.cuisine,
        userId: currentUser.uid,
      };
      await createRecipe(newRecipe);
      message.success("Recipe created successfully!");
      history.push("/");
    } catch (error) {
      console.error(error);
      message.error("Failed to create recipe");
      setLoading(false);
    }
  };

  return (
    <div>
      <Typography.Title level={2}>Create a New Recipe</Typography.Title>
      <Form
        onFinish={onFinish}
        layout="vertical"
        initialValues={{
          title: "",
          description: "",
          ingredients: "",
          steps: "",
          image: "",
          cuisine: "",
        }}
      >
        <Row gutter={16}>
          <Col xs={24} md={12}>
            <Form.Item
              name="title"
              label="Title"
              rules={[{ required: true, message: "Title is required" }]}
            >
              <Input placeholder="Enter the recipe title" />
            </Form.Item>
            <Form.Item
              name="description"
              label="Description"
              rules={[{ required: true, message: "Description is required" }]}
            >
              <TextArea
                placeholder="Enter a description for your recipe"
                autoSize={{ minRows: 3 }}
              />
            </Form.Item>
            <Form.Item
              name="ingredients"
              label="Ingredients"
              rules={[{ required: true, message: "Ingredients are required" }]}
            >
              <TextArea
                placeholder="Enter the recipe ingredients, separated by commas"
                autoSize={{ minRows: 6 }}
              />
            </Form.Item>
          </Col>
          <Col xs={24} md={12}>
            <Form.Item
              name="steps"
              label="Steps"
              rules={[{ required: true, message: "Steps are required" }]}
            >
              <TextArea
                placeholder="Enter the recipe steps, separated by commas"
                autoSize={{ minRows: 6 }}
              />
            </Form.Item>
            <Form.Item
              name="image"
              label="Image URL"
              rules={[{ required: true, message: "Image URL is required" }]}
            >
              <Input placeholder="Enter the recipe image URL" />
            </Form.Item>
            <Form.Item
              name="cuisine"
              label="Cuisine"
              rules={[{ required: true, message: "Cuisine is required" }]}
            >
              <Select placeholder="Select the recipe cuisine">
                <Option value="American">American</Option>
                <Option value="Italian">Italian</Option>
                <Option value="Mexican">Mexican</Option>
                <Option value="Asian">Asian</Option>
                <Option value="Other">Other</Option>
              </Select>
            </Form.Item>
            <Form.Item>
              <Button type="primary" htmlType="submit" loading={loading}>
                Create Recipe
              </Button>
            </Form.Item>
          </Col>
        </Row>
      </Form>
    </div>
  );
};

export default CreateRecipe;
