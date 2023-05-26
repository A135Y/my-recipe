// server/api/index.js
const express = require("express");
const app = express();
const cors = require("cors");
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
const { sequelize } = require("../database/db");
const recipeController = require("../controllers/recipeController");
const userController = require("../controllers/userController");
const { importRecipesFromJson } = require("../controllers/recipeController"); // Import the function
require("dotenv").config();


app.use(recipeController, userController);

app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).send("Something went wrong!");
});

const port = process.env.PORT;

sequelize.sync({ force: true })
  .then(() => importRecipesFromJson())
  .then(() => {
    app.listen(port, () => {
      console.log(`Server is running on port ${port}`);
    });
  })
  .catch((error) => {
    console.error("Error syncing database and importing recipes:", error);
  });


module.exports = { port: port, app };
