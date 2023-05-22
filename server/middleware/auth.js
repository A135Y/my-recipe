const jwt = require("jsonwebtoken");
const { User } = require("../models/user");

const auth = async (req, res, next) => {
  try {
    const token = req.header("Authorization").replace("Bearer ", "");
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const user = await User.findOne({
      _id: decoded._id,
      "tokens.token": token,
    });
    if (!user) {
      throw new Error();
    }
    req.user = user;
    req.token = token;
    q1;
    next();
  } catch (error) {
    console.error(error);
    res.status(401).json({ message: "Please authenticate" });
  }
};

module.exports = { auth };
