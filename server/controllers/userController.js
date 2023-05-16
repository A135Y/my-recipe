// userController.js
const express = require("express");
const router = express.Router();
const { User } = require("../models/user");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const SALT_COUNT = 10;

router.get("/users", async (req, res) => {
  const users = await User.findAll();
  res.json(users);
});

router.get("/users/:id", async (req, res) => {
  const user = await User.findByPk(req.params.id);
  res.json(user);
});

router.post("/users", async (req, res) => {
  const user = await User.create(req.body);
  const hashedPassword = await bcrypt.hash(user.password, SALT_COUNT);
  user.password = hashedPassword;
  await user.save();
  res.json(user);
});

router.put("/users/:id", async (req, res) => {
  const user = await User.findByPk(req.params.id);
  const hashedPassword = await bcrypt.hash(user.password, SALT_COUNT);
  user.password = hashedPassword;
  await user.update(req.body);
  res.json(user);
});

router.delete("/users/:id", async (req, res) => {
  const user = await User.findByPk(req.params.id);
  await user.destroy();
  res.json(user);
});

module.exports = router;
