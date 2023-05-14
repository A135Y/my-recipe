const request = require("supertest");
const recipeController = require("../server/controllers/recipeController");
const api = require("../server/api");
const { Recipe } = require("../server/models/recipe");
const { sequelize } = require("../server/database/db");

const app = api.app;
const server = app.listen();

beforeAll(async () => {
    await sequelize.sync();
});

afterAll(() => {
    server.close();
});

afterEach(async () => {
    await Recipe.destroy({ truncate: true, force: true });
});

describe("GET /recipes", () => {
    test("Gets list of recipes", async () => {
        const response = await request(app).get("/recipes");
        expect(response.status).toBe(200);
    });
});


describe("POST /recipes", () => {
    test("Creates a new recipe", async () => {
        const recipe = await Recipe.create({
            title: "Chocolate Lava Cake",
            description: "A rich chocolate cake with a molten chocolate center. Perfect for chocolate lovers!",
            ingredients: [{ "name": "All-purpose flour", "amount": "1/2 cup" }, { "name": "Granulated sugar", "amount": "1/2 cup" }, { "name": "Unsweetened cocoa powder", "amount": "1/3 cup" }, { "name": "Baking powder", "amount": "1 teaspoon" }, { "name": "Salt", "amount": "1/4 teaspoon" }, { "name": "Milk", "amount": "1/3 cup" }, { "name": "Melted butter", "amount": "1/3 cup" }, { "name": "Vanilla extract", "amount": "1 teaspoon" }, { "name": "Semi-sweet chocolate chips", "amount": "1 cup" }],
            steps: "1. Preheat the oven to 350°F and grease four 6-ounce ramekins.\n2. In a bowl, whisk together the flour, sugar, cocoa, baking powder, and salt.\n3. In a separate bowl, whisk together the milk, melted butter, and vanilla.\n4. Add the wet ingredients to the dry ingredients and stir until just combined. Gently fold in the chocolate chips.\n5. Divide the batter evenly between the prepared ramekins. Bake for about 12 minutes, until the edges are set but the center is still wobbly.\n6. Allow cakes to cool for 5 minutes, then serve immediately with ice cream, whipped cream, or fresh berries if desired.",
            image: "https://images.unsplash.com/photo-1581093457331-9d8a2d9e3f5c?ixid=MnwxMjA3fDB8MHxzZWFyY2h8Mnx8Y2hvY29sYXRlJTIwbGF2YXxlbnwwfHwwfHw%3D&ixlib=rb-1.2.1&w=1000&q=80",
            cuisine: "American"
        });
        const response = await request(app).post("/recipes").send({
            title: "Chocolate Lava Cake",
            description: "A rich chocolate cake with a molten chocolate center. Perfect for chocolate lovers!",
            ingredients: [{ "name": "All-purpose flour", "amount": "1/2 cup" }, { "name": "Granulated sugar", "amount": "1/2 cup" }, { "name": "Unsweetened cocoa powder", "amount": "1/3 cup" }, { "name": "Baking powder", "amount": "1 teaspoon" }, { "name": "Salt", "amount": "1/4 teaspoon" }, { "name": "Milk", "amount": "1/3 cup" }, { "name": "Melted butter", "amount": "1/3 cup" }, { "name": "Vanilla extract", "amount": "1 teaspoon" }, { "name": "Semi-sweet chocolate chips", "amount": "1 cup" }],
            steps: "1. Preheat the oven to 350°F and grease four 6-ounce ramekins.\n2. In a bowl, whisk together the flour, sugar, cocoa, baking powder, and salt.\n3. In a separate bowl, whisk together the milk, melted butter, and vanilla.\n4. Add the wet ingredients to the dry ingredients and stir until just combined. Gently fold in the chocolate chips.\n5. Divide the batter evenly between the prepared ramekins. Bake for about 12 minutes, until the edges are set but the center is still wobbly.\n6. Allow cakes to cool for 5 minutes, then serve immediately with ice cream, whipped cream, or fresh berries if desired.",
            image: "https://images.unsplash.com/photo-1581093457331-9d8a2d9e3f5c?ixid=MnwxMjA3fDB8MHxzZWFyY2h8Mnx8Y2hvY29sYXRlJTIwbGF2YXxlbnwwfHwwfHw%3D&ixlib=rb-1.2.1&w=1000&q=80",
            cuisine: "American"
        }); expect(response.status).toBe(200);
    });
})

describe("GET /recipes/:id", () => {
    test("Gets a recipe by id", async () => {
        const recipe = await Recipe.create({
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
        const response = await request(app).get(`/recipes/${recipe.id}`);
        expect(response.status).toBe(200);
    });
});

describe("PUT /recipes/:id", () => {
    test("Updates a recipe", async () => {
        const recipe = await Recipe.create({
            title: "Chocolate Lava Cake",
            description: "A rich chocolate cake with a molten chocolate center. Perfect for chocolate lovers!",
            ingredients: [{ "name": "All-purpose flour", "amount": "1/2 cup" }, { "name": "Granulated sugar", "amount": "1/2 cup" }, { "name": "Unsweetened cocoa powder", "amount": "1/3 cup" }, { "name": "Baking powder", "amount": "1 teaspoon" }, { "name": "Salt", "amount": "1/4 teaspoon" }, { "name": "Milk", "amount": "1/3 cup" }, { "name": "Melted butter", "amount": "1/3 cup" }, { "name": "Vanilla extract", "amount": "1 teaspoon" }, { "name": "Semi-sweet chocolate chips", "amount": "1 cup" }],
            steps: "1. Preheat the oven to 350°F and grease four 6-ounce ramekins.\n2. In a bowl, whisk together the flour, sugar, cocoa, baking powder, and salt.\n3. In a separate bowl, whisk together the milk, melted butter, and vanilla.\n4. Add the wet ingredients to the dry ingredients and stir until just combined. Gently fold in the chocolate chips.\n5. Divide the batter evenly between the prepared ramekins. Bake for about 12 minutes, until the edges are set but the center is still wobbly.\n6. Allow cakes to cool for 5 minutes, then serve immediately with ice cream, whipped cream, or fresh berries if desired.",
            image: "https://images.unsplash.com/photo-1581093457331-9d8a2d9e3f5c?ixid=MnwxMjA3fDB8MHxzZWFyY2h8Mnx8Y2hvY29sYXRlJTIwbGF2YXxlbnwwfHwwfHw%3D&ixlib=rb-1.2.1&w=1000&q=80",
            cuisine: "American"
        });
        const response = await request(app).put(`/recipes/${recipe.id}`).send({
            title: "Chocolate Lava Cake",
            description: "A rich chocolate cake with a molten chocolate center. Perfect for chocolate lovers!",
            ingredients: [{ "name": "All-purpose flour", "amount": "1/2 cup" }, { "name": "Granulated sugar", "amount": "1/2 cup" }, { "name": "Unsweetened cocoa powder", "amount": "1/3 cup" }, { "name": "Baking powder", "amount": "1 teaspoon" }, { "name": "Salt", "amount": "1/4 teaspoon" }, { "name": "Milk", "amount": "1/3 cup" }, { "name": "Melted butter", "amount": "1/3 cup" }, { "name": "Vanilla extract", "amount": "1 teaspoon" }, { "name": "Semi-sweet chocolate chips", "amount": "1 cup" }],
            steps: "1. Preheat the oven to 350°F and grease four 6-ounce ramekins.\n2. In a bowl, whisk together the flour, sugar, cocoa, baking powder, and salt.\n3. In a separate bowl, whisk together the milk, melted butter, and vanilla.\n4. Add the wet ingredients to the dry ingredients and stir until just combined. Gently fold in the chocolate chips.\n5. Divide the batter evenly between the prepared ramekins. Bake for about 12 minutes, until the edges are set but the center is still wobbly.\n6. Allow cakes to cool for 5 minutes, then serve immediately with ice cream, whipped cream, or fresh berries if desired.",
            image: "https://images.unsplash.com/photo-1581093457331-9d8a2d9e3f5c?ixid=MnwxMjA3fDB8MHxzZWFyY2h8Mnx8Y2hvY29sYXRlJTIwbGF2YXxlbnwwfHwwfHw%3D&ixlib=rb-1.2.1&w=1000&q=80",
            cuisine: "American"
        });
        expect(response.status).toBe(200);
    });
});

describe("DELETE /recipes/:id", () => {
    test("Deletes a recipe", async () => {
        const recipe = await Recipe.create({
            title: "Chocolate Lava Cake",
            description: "A rich chocolate cake with a molten chocolate center. Perfect for chocolate lovers!",
            ingredients: [{ "name": "All-purpose flour", "amount": "1/2 cup" }, { "name": "Granulated sugar", "amount": "1/2 cup" }, { "name": "Unsweetened cocoa powder", "amount": "1/3 cup" }, { "name": "Baking powder", "amount": "1 teaspoon" }, { "name": "Salt", "amount": "1/4 teaspoon" }, { "name": "Milk", "amount": "1/3 cup" }, { "name": "Melted butter", "amount": "1/3 cup" }, { "name": "Vanilla extract", "amount": "1 teaspoon" }, { "name": "Semi-sweet chocolate chips", "amount": "1 cup" }],
            steps: "1. Preheat the oven to 350°F and grease four 6-ounce ramekins.\n2. In a bowl, whisk together the flour, sugar, cocoa, baking powder, and salt.\n3. In a separate bowl, whisk together the milk, melted butter, and vanilla.\n4. Add the wet ingredients to the dry ingredients and stir until just combined. Gently fold in the chocolate chips.\n5. Divide the batter evenly between the prepared ramekins. Bake for about 12 minutes, until the edges are set but the center is still wobbly.\n6. Allow cakes to cool for 5 minutes, then serve immediately with ice cream, whipped cream, or fresh berries if desired.",
            image: "https://images.unsplash.com/photo-1581093457331-9d8a2d9e3f5c?ixid=MnwxMjA3fDB8MHxzZWFyY2h8Mnx8Y2hvY29sYXRlJTIwbGF2YXxlbnwwfHwwfHw%3D&ixlib=rb-1.2.1&w=1000&q=80",
            cuisine: "American"
        });
        const response = await request(app).delete(`/recipes/${recipe.id}`);
        expect(response.status).toBe(200);
    })
})

afterAll(async () => {
    await sequelize.close();
});
