// userController.js
const express = require("express");
const router = express.Router();
const { User } = require("../models/user");

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
  res.json(user);
});

router.put("/users/:id", async (req, res) => {
  const user = await User.findByPk(req.params.id);
  await user.update(req.body);
  res.json(user);
});

router.delete("/users/:id", async (req, res) => {
  const user = await User.findByPk(req.params.id);
  await user.destroy();
  res.json(user);
});

module.exports = router;
