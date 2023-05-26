const express = require("express");
const router = express.Router();
const { Recipe } = require("../models/recipe");
const jsonfile = require("jsonfile");
const { sequelize } = require("../database/db");
require("dotenv").config();
const path = require("path");

async function importRecipesFromJson() {
  try {
    // Read data from the JSON file
    const dataFilePath = path.join(__dirname, "../../data/recipes.json");
    const data = await jsonfile.readFile(dataFilePath);
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
  const page = parseInt(req.query.page) || 1; // Parse the page query parameter as an integer
  const size = parseInt(req.query.size) || 12; // Parse the size query parameter as an integer

  const totalCount = await Recipe.count(); // Get the total count of recipes

  const recipes = await Recipe.findAll({
    offset: (page - 1) * size,
    limit: size,
  });
  res.json({
    recipes,
    totalCount,
  });
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

module.exports = { importRecipesFromJson, router }
