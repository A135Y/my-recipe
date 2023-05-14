const express = require("express");
const app = express();
const cors = require("cors");
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
const { sequelize } = require("../database/db");
const recipeController = require("../controllers/recipeController");
const userController = require("../controllers/userController");
require("dotenv").config();

app.use(recipeController, userController);

app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).send('Something went wrong!');
});

const port = process.env.PORT

sequelize.sync().then(() => {
  app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
  });
});

module.exports = { port: port, app }