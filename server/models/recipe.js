const { DataTypes } = require("sequelize");
const { sequelize } = require("../database/db");

const Recipe = sequelize.define("recipe", {
  title: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  description: {
    type: DataTypes.TEXT,
    allowNull: false,
  },
  ingredients: {
    type: DataTypes.JSONB,
    allowNull: false,
  },
  steps: {
    type: DataTypes.TEXT,
    allowNull: false,
  },
  image: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  cuisine: {
    type: DataTypes.STRING,
    allowNull: false,
  },
});

module.exports = { Recipe };
