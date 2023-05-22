// userController.js
const express = require("express");
const router = express.Router();
const { User } = require("../models/user");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const SALT_COUNT = 10;
const { auth } = require("../middleware/auth");

router.get("/home", auth, (req, res) => {
  // Only authenticated users can access this route
  res.send("Welcome to the home page");
});

router.get("/users", async (req, res) => {
  const users = await User.findAll();
  res.json(users);
});

router.get("/users/:id", async (req, res) => {
  const user = await User.findByPk(req.params.id);
  res.json(user);
});

router.post("/register", async (req, res) => {
  try {
    const { username, email, password, bio } = req.body;
    const errors = [];

    const isValidEmail = (email) => {
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      return emailRegex.test(email);
    };

    // Check username
    if (!username) {
      errors.push({
        field: "username",
        message: "Please input your username!",
      });
    }

    // Check email
    if (!email) {
      errors.push({
        field: "email",
        message: "Please enter your email address",
      });
    } else if (!isValidEmail(email)) {
      errors.push({
        field: "email",
        message: "Please enter a valid email address",
      });
    }

    // Check password
    if (!password) {
      errors.push({
        field: "password",
        message: "Please enter your password!",
      });
    }

    // Check bio
    if (bio && bio.length > 256) {
      errors.push({
        field: "bio",
        message: "Bio must be 256 characters or less",
      });
    }

    if (errors.length > 0) {
      return res.status(400).json(errors);
    }

    // Hash password and save user
    const hashedPassword = await bcrypt.hash(password, SALT_COUNT);
    const newUser = {
      username,
      email,
      password: hashedPassword,
      bio,
    };
    await User.create(newUser);

    return res.status(201).send("User created");
  } catch (error) {
    console.error(error);
    return res.status(500).send("Internal Server Error");
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

router.post("/login", async (req, res) => {
  try {
    const { email, password, googleToken } = req.body;
    const errors = [];
    // Check email
    console.log("email", email, "password", password);
    if (googleToken) {
      // Verify the Google ID token
      const client = new OAuth2Client("YOUR_GOOGLE_CLIENT_ID");

      const ticket = await client.verifyIdToken({
        idToken: googleToken,
        audience: "YOUR_GOOGLE_CLIENT_ID",
      });

      const payload = ticket.getPayload();
      const googleEmail = payload.email;

      // Check if the Google email matches the user's email
      if (email !== googleEmail) {
        return res.status(400).send("Invalid email");
      }

      // Create token
      const token = jwt.sign({ email }, process.env.JWT_SECRET, {
        expiresIn: "1h",
      });

      return res.json({ token });
    } else {
      if (!email) {
        errors.push({
          field: "email",
          message: "Please enter your email address",
        });
      }
      // Check password
      if (!password) {
        errors.push({
          field: "password",
          message: "Please enter your password!",
        });
      }
      if (errors.length > 0) {
        return res.status(400).json(errors);
      }
      // Check if user exists
      const user = await User.findOne({
        where: {
          email,
        },
      });
      if (!user) {
        return res.status(400).send("Invalid email");
      }
      // Check if password is correct
      const isCorrectPassword = await bcrypt.compare(password, user.password);
      if (!isCorrectPassword) {
        return res.status(400).send("Invalid password");
      }
      // Create token
      const payload = {
        id: user.id,
        username: user.username,
        email: user.email,
      };
      const token = jwt.sign(payload, process.env.JWT_SECRET, {
        expiresIn: "1h",
      });

      return res.json({ token });
    }
  } catch (error) {
    console.error(error);
    return res.status(500).send("Internal Server Error");
  }
});

module.exports = router;
