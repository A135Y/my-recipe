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
  //use a security method to prevent injection attacks
  const isGreaterThanEight = user.password.length > 8;
  const hasUpperCase = /[A-Z]/.test(user.password);
  const hasLowerCase = /[a-z]/.test(user.password);
  const hasNumber = /\d/.test(user.password);
  const hasNonAlphaNumeric = /\W/.test(user.password);
  if (
    isGreaterThanEight &&
    hasUpperCase &&
    hasLowerCase &&
    hasNumber &&
    hasNonAlphaNumeric
  ) {
    const hashedPassword = await bcrypt.hash(user.password, SALT_COUNT);
    user.password = hashedPassword;
    await user.save();
    res.json(user);
  } else {
    res.status(400).send("Password does not meet requirements");
  }
});

router.put("/users/:id", async (req, res) => {
  const user = await User.findByPk(req.params.id);
  const isGreaterThanEight = user.password.length > 8;
  const hasUpperCase = /[A-Z]/.test(user.password);
  const hasLowerCase = /[a-z]/.test(user.password);
  const hasNumber = /\d/.test(user.password);
  const hasNonAlphaNumeric = /\W/.test(user.password);
  const isTheSamePassword = await bcrypt.compare(
    req.body.password,
    user.password
  );
  const isTheSameEmail = req.body.email === user.email;
  const isTheSameUsername = req.body.username === user.username;

  if (isTheSamePassword && isTheSameEmail && isTheSameUsername) {
    res.status(400).send("No changes made");
  }

  if (
    isGreaterThanEight &&
    hasUpperCase &&
    hasLowerCase &&
    hasNumber &&
    hasNonAlphaNumeric
  ) {
    const hashedPassword = await bcrypt.hash(user.password, SALT_COUNT);
    user.password = hashedPassword;
    await user.update(req.body);
    res.json(user);
  } else {
    res.status(400).send("Password does not meet requirements");
  }
});

router.delete("/users/:id", async (req, res) => {
  const user = await User.findByPk(req.params.id);
  await user.destroy();
  res.json(user);
});

module.exports = router;
