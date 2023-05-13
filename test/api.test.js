const request = require("supertest");
const app = require("../src/App");
const { Recipe } = require("../models/recipe");
const jsonfile = require("jsonfile");
const { sequelize } = require("../database/db");
const path = require("path");
const { expect } = require("chai");


const RECIPES_JSON_FILE = path.join(__dirname, "../data/recipes.json");

before(async () => {
    await sequelize.sync({ force: true }); // recreate db
    const data = await jsonfile.readFile(RECIPES_JSON_FILE);
    await Recipe.bulkCreate(data);
});

after(async () => {
    await sequelize.drop();
});


describe.only("Recipe API", () => {
    describe.only("GET /recipes", () => {
        it("should return all recipes", (done) => {
            request(app)
                .get("/recipes")
                .expect("Content-Type", /json/)
                .expect(200)
                .then((res) => {
                    const recipes = res.body;
                    expect(recipes.length).to.be.greaterThan(0);
                    done();
                })
                .catch((err) => done(err));
        });
    });

    describe.only("GET /recipes/:id", () => {
        it("should return a recipe by id", (done) => {
            Recipe.findOne().then((recipe) => {
                request(app)
                    .get("/recipes/" + recipe.id)
                    .expect("Content-Type", /json/)
                    .expect(200)
                    .then((res) => {
                        const returnedRecipe = res.body;
                        expect(returnedRecipe.title).to.equal(recipe.title);
                        expect(returnedRecipe.description).to.equal(recipe.description);
                        done();
                    })
                    .catch((err) => done(err));
            });
        });
    });

    describe.only("POST /recipes", () => {
        it("should create a new recipe", (done) => {
            const newRecipe = {
                title: "New recipe",
                description: "A new recipe",
                ingredients: ["Ingredient 1", "Ingredient 2"],
                steps: "Step 1, Step 2",
                image: "https://image.com",
                cuisine: "Cuisine",
            };
            request(app)
                .post("/recipes")
                .send(newRecipe)
                .expect("Content-Type", /json/)
                .expect(200)
                .then((res) => {
                    const createdRecipe = res.body;
                    expect(createdRecipe.title).to.equal(newRecipe.title);
                    expect(createdRecipe.description).to.equal(newRecipe.description);
                    expect(createdRecipe.ingredients).to.eql(newRecipe.ingredients);
                    expect(createdRecipe.steps).to.equal(newRecipe.steps);
                    expect(createdRecipe.image).to.equal(newRecipe.image);
                    expect(createdRecipe.cuisine).to.equal(newRecipe.cuisine);
                    done();
                })
                .catch((err) => done(err));
        });
    });

    describe.only("PUT /recipes/:id", () => {
        it("should update a recipe", (done) => {
            Recipe.findOne().then((recipe) => {
                const updatedRecipe = {
                    title: "Updated recipe",
                    description: "An updated recipe",
                    ingredients: ["Ingredient 1", "Ingredient 2", "Ingredient 3"],
                    steps: "Step 1, Step 2, Step 3",
                    image: "https://image-updated.com",
                    cuisine: "Cuisine updated",
                };
                request(app)
                    .put("/recipes/" + recipe.id)
                    .send(updatedRecipe)
                    .expect("Content-Type", /json/)
                    .expect(200).then((res) => {
                        const updatedRecipe = res.body;
                        expect(updatedRecipe.title).to.equal(updatedRecipe.title);
                        expect(updatedRecipe.description).to.equal(updatedRecipe.description);
                        expect(updatedRecipe.ingredients).to.eql(updatedRecipe.ingredients);
                        expect(updatedRecipe.steps).to.equal(updatedRecipe.steps);
                        expect(updatedRecipe.image).to.equal(updatedRecipe.image);
                        expect(updatedRecipe.cuisine).to.equal(updatedRecipe.cuisine);
                        done();
                    })
                    .catch((err) => done(err));
            });
        });
    });
    describe.only("DELETE /recipes/:id", () => {
        it("should delete a recipe", (done) => {
            Recipe.findOne().then((recipe) => {
                request(app)
                    .delete("/recipes/" + recipe.id)
                    .expect(200)
                    .then(() => {
                        Recipe.findByPk(recipe.id).then((foundRecipe) => {
                            expect(foundRecipe).to.be.null;
                            done();
                        });
                    })
                    .catch((err) => done(err));
            });
        });
    });

    after(async () => {
        await sequelize.drop();
    });
});

