//create a model for the recipes that a particular user has liked
const { DataTypes } = require("sequelize");
const { sequelize } = require("../database/db");

const UserRecipeLikes = sequelize.define("userRecipeLikes", {
  userId: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  recipeId: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
});

module.exports = { UserRecipeLikes };
