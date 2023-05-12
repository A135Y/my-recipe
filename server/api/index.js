// index.js
const express = require("express");
const app = express();
const cors = require("cors");
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
const { sequelize } = require("../database/db");
const recipeController = require("../controllers/RecipeController");
const userController = require("../controllers/UserController");

app.use(recipeController, userController);

sequelize.sync().then(() => {
  app.listen(3000, () => {
    console.log("Server is running on port 3000");
  });
});
