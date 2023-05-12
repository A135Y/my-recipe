const express = require("express");
const router = express.Router();
const { Recipe } = require("../models/recipe");
const jsonfile = require("jsonfile");
const { sequelize } = require("../database/db");

async function importRecipesFromJson() {
  try {
    // Read data from the JSON file
    const data = await jsonfile.readFile("./data/recipes.json");
    // Insert the data into the database using Sequelize
    await Recipe.bulkCreate(data);
    console.log("Recipes imported successfully");
  } catch (error) {
    console.error("Error importing recipes:", error);
  }
}

(async () => {
  try {
    await sequelize.sync({ force: true }); // recreate db
    await importRecipesFromJson();
  } catch (error) {
    console.error("Error syncing database and importing recipes:", error);
  }
})();

router.get("/recipes", async (req, res) => {
  const recipes = await Recipe.findAll();
  res.json(recipes);
});

router.get("/recipes/:id", async (req, res) => {
  const recipe = await Recipe.findByPk(req.params.id);
  res.json(recipe);
});

router.post("/recipes", async (req, res) => {
  const recipe = await Recipe.create(req.body);
  res.json(recipe);
});

router.put("/recipes/:id", async (req, res) => {
  const recipe = await Recipe.findByPk(req.params.id);
  await recipe.update(req.body);
  res.json(recipe);
});

router.delete("/recipes/:id", async (req, res) => {
  const recipe = await Recipe.findByPk(req.params.id);
  await recipe.destroy();
  res.json(recipe);
});

module.exports = router;
