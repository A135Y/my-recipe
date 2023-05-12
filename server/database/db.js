//create the sqlite database
const sqlite3 = require("sqlite3").verbose();
const DBSOURCE = "db.sqlite";

const path = require("path");
const { Sequelize } = require("sequelize");

const sequelize = new Sequelize({
  dialect: "sqlite",
  storage: path.join(__dirname, "db.sqlite"),
  logging: false,
});

module.exports = {
  sequelize,
  Sequelize,
};
