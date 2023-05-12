//create the authentication middleware
// Path: server/middleware/auth.js
import jwt from "jsonwebtoken";
import { User } from "../models/user.js";

const auth = async (req, res, next) => {
  try {
    //get the token from the request header
    const token = req.header("Authorization").replace("Bearer ", "");
    //verify the token
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    //find the user with the id and the token
    const user = await User.findOne({
      _id: decoded._id,
      "tokens.token": token,
    });
    //if no user is found, throw an error
    if (!user) {
      throw new Error();
    }
    //if a user is found, add the user and token to the request
    req.user = user;
    req.token = token;
    //call the next middleware
    next();
  } catch (error) {
    console.error(error);
    res.status(401).json({ message: "Please authenticate" });
  }
};

export { auth };
