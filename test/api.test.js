const request = require("supertest");
const api = require("../server/api/index");
const { Recipe } = require("../server/models/recipe");
const { sequelize } = require("../server/database/db");
const Op = require("sequelize").Op;
const app = api.app;
const server = app.listen();

beforeAll(async () => {
  await sequelize.sync();
  // Insert test data into the database before each test
  await Recipe.bulkCreate([
    {
      title: "Chocolate Lava Cake",
      description: "A rich chocolate cake with a molten chocolate center. Perfect for chocolate lovers!",
      ingredients: [
        { name: "All-purpose flour", amount: "1/2 cup" },
        { name: "Granulated sugar", amount: "1/2 cup" },
        { name: "Unsweetened cocoa powder", amount: "1/3 cup" },
        { name: "Baking powder", amount: "1 teaspoon" },
        { name: "Salt", amount: "1/4 teaspoon" },
        { name: "Milk", amount: "1/3 cup" },
        { name: "Melted butter", amount: "1/3 cup" },
        { name: "Vanilla extract", amount: "1 teaspoon" },
        { name: "Semi-sweet chocolate chips", amount: "1 cup" },
      ],
      steps: "1. Preheat oven to 400 degrees F. Grease four 6-ounce custard cups or souffle dishes. Place on baking sheet.\n2. Microwave chocolate and butter in large microwaveable bowl on HIGH 1 minute or until butter is melted. Stir with wire whisk until chocolate is completely melted. Stir in sugar until well blended. Whisk in eggs and vanilla. Stir in flour and salt. Pour batter into prepared custard cups.\n3. Bake 14 to 15 minutes or until sides are firm but centers are soft. Let stand 1 minute. Carefully run small knife around cakes to loosen. Invert cakes onto dessert dishes. Serve immediately.",
      image: "https://images.unsplash.com/photo-1581093458791-9d3c9ebe6f1e",
      cuisine: "American"
    },
    {
      title: "Pancakes",
      description: "A classic breakfast staple. Serve with butter and maple syrup.",
      ingredients: [
        { name: "All-purpose flour", amount: "1 1/2 cups" },
        { name: "Baking powder", amount: "3 1/2 teaspoons" },
        { name: "Salt", amount: "1 teaspoon" },
        { name: "White sugar", amount: "1 tablespoon" },
        { name: "Milk", amount: "1 1/4 cups" },
        { name: "Egg", amount: "1" },
        { name: "Melted butter", amount: "3 tablespoons" },
      ],
      steps: "1. In a large bowl, sift together the flour, baking powder, salt and sugar. Make a well in the center and pour in the milk, egg and melted butter; mix until smooth.\n2. Heat a lightly oiled griddle or frying pan over medium high heat. Pour or scoop the batter onto the griddle, using approximately 1/4 cup for each pancake. Brown on both sides and serve hot.",
      image: "https://images.unsplash.com/photo-1581093458791-9d3c9ebe6f1e",
      cuisine: "American"
    },
    {
      title: "Chocolate Chip Cookies",
      description: "A classic cookie that everyone loves. Perfect for parties or as a snack.",
      ingredients: [
        { name: "Butter", amount: "1 cup" },
        { name: "White sugar", amount: "1 cup" },
        { name: "Brown sugar", amount: "1 cup" },
        { name: "Eggs", amount: "2" },
        { name: "Vanilla extract", amount: "2 teaspoons" },
        { name: "All-purpose flour", amount: "3 cups" },
        { name: "Baking soda", amount: "1 teaspoon" },
        { name: "Hot water", amount: "2 teaspoons" },
        { name: "Salt", amount: "1/2 teaspoon" },
        { name: "Semi-sweet chocolate chips", amount: "2 cups" },
        { name: "Chopped walnuts", amount: "1 cup" },
      ],
      steps: "1. Preheat oven to 350 degrees F (175 degrees C).\n2. Cream together the butter, white sugar, and brown sugar until smooth. Beat in the eggs one at a time, then stir in the vanilla. Dissolve baking soda in hot water. Add to batter along with salt. Stir in flour, chocolate chips, and nuts. Drop by large spoonfuls onto ungreased pans.\n3. Bake for about 10 minutes in the preheated oven, or until edges are nicely browned.",
      image: "https://images.unsplash.com/photo-1581093458791-9d3c9ebe6f1e",
      cuisine: "American"
    }
  ]);
});


afterAll(async () => {
  await sequelize.close();
});

afterAll(() => {
  server.close();
});


afterEach(async () => {
  // Clean up the database after each test
  await Recipe.destroy({
    where: {
      id: {
        [Op.notIn]: [1, 2, 3], // IDs of the seed data recipes
      },
    },
    truncate: true,
    force: true,
  });
});


describe("GET /recipes", () => {
  test("Gets list of recipes", async () => {
    const response = await request(app).get("/recipes");
    expect(response.status).toBe(200);
    expect(response.body.length).toBe(3);
  });
});

describe("POST /recipes", () => {
  test("Creates a new recipe", async () => {
    const response = await request(app)
      .post("/recipes")
      .send({
        title: "Chocolate Lava Cake",
        description:
          "A rich chocolate cake with a molten chocolate center. Perfect for chocolate lovers!",
        ingredients: [
          { name: "All-purpose flour", amount: "1/2 cup" },
          { name: "Granulated sugar", amount: "1/2 cup" },
          { name: "Unsweetened cocoa powder", amount: "1/3 cup" },
          { name: "Baking powder", amount: "1 teaspoon" },
          { name: "Salt", amount: "1/4 teaspoon" },
          { name: "Milk", amount: "1/3 cup" },
          { name: "Melted butter", amount: "1/3 cup" },
          { name: "Vanilla extract", amount: "1 teaspoon" },
          { name: "Semi-sweet chocolate chips", amount: "1 cup" },
        ],
        steps:
          "1. Preheat the oven to 350°F and grease four 6-ounce ramekins.\n2. In a bowl, whisk together the flour, sugar, cocoa, baking powder, and salt.\n3. In a separate bowl, whisk together the milk, melted butter, and vanilla.\n4. Add the wet ingredients to the dry ingredients and stir until just combined. Gently fold in the chocolate chips.\n5. Divide the batter evenly between the prepared ramekins. Bake for about 12 minutes, until the edges are set but the center is still wobbly.\n6. Allow cakes to cool for 5 minutes, then serve immediately with ice cream, whipped cream, or fresh berries if desired.",
        image:
          "https://images.unsplash.com/photo-1581093457331-9d8a2d9e3f5c?ixid=MnwxMjA3fDB8MHxzZWFyY2h8Mnx8Y2hvY29sYXRlJTIwbGF2YXxlbnwwfHwwfHw%3D&ixlib=rb-1.2.1&w=1000&q=80",
        cuisine: "American",
      });
    expect(response.status).toBe(200);
  });
});

describe("GET /recipes/:id", () => {
  test("Gets a recipe by id", async () => {
    const id = 1;
    const response = await request(app).get(`/recipes/${id}`);
    expect(response.status).toBe(200);
  });
});

describe("PUT /recipes/:id", () => {
  test("Updates a recipe", async () => {
    const id = 1;
    const response = await request(app)
      .put(`/recipes/${id}`)
      .send({
        title: "Chocolate Lava Cake",
        description:
          "A rich chocolate cake with a molten chocolate center. Perfect for chocolate lovers!",
        ingredients: [
          { name: "All-purpose flour", amount: "1/2 cup" },
          { name: "Granulated sugar", amount: "1/2 cup" },
          { name: "Unsweetened cocoa powder", amount: "1/3 cup" },
          { name: "Baking powder", amount: "1 teaspoon" },
          { name: "Salt", amount: "1/4 teaspoon" },
          { name: "Milk", amount: "1/3 cup" },
          { name: "Melted butter", amount: "1/3 cup" },
          { name: "Vanilla extract", amount: "1 teaspoon" },
          { name: "Semi-sweet chocolate chips", amount: "1 cup" },
        ],
        steps:
          "1. Preheat the oven to 350°F and grease four 6-ounce ramekins.\n2. In a bowl, whisk together the flour, sugar, cocoa, baking powder, and salt.\n3. In a separate bowl, whisk together the milk, melted butter, and vanilla.\n4. Add the wet ingredients to the dry ingredients and stir until just combined. Gently fold in the chocolate chips.\n5. Divide the batter evenly between the prepared ramekins. Bake for about 12 minutes, until the edges are set but the center is still wobbly.\n6. Allow cakes to cool for 5 minutes, then serve immediately with ice cream, whipped cream, or fresh berries if desired.",
        image:
          "https://images.unsplash.com/photo-1581093457331-9d8a2d9e3f5c?ixid=MnwxMjA3fDB8MHxzZWFyY2h8Mnx8Y2hvY29sYXRlJTIwbGF2YXxlbnwwfHwwfHw%3D&ixlib=rb-1.2.1&w=1000&q=80",
        cuisine: "American",
      });
    expect(response.status).toBe(200);
  });
});

describe("DELETE /recipes/:id", () => {
  test("Deletes a recipe", async () => {
    const id = 1;
    const response = await request(app).delete(`/recipes/${id}`);
    expect(response.status).toBe(200);
  });
});

describe("POST /register", () => {
  test("Registers a new user", async () => {
    const response = await request(app).post("/register").send({
      email: "testemail.com",
      username: "testuser",
      password: "password",
      bio: "test bio",
    });
    expect(response.status).toBe(200);
  });
});
