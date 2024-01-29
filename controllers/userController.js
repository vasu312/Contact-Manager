// Imports
const asyncHandler = require("express-async-handler");
const sequelize = require("../config/db");
const userModel = require("../model/userModel");
const jwt = require("jsonwebtoken");
const { compare } = require("bcrypt");
const env = require("env");

// Model Imports
const User = userModel(sequelize);

/*
    @Description : Login User 
    @Route       : POST /api/user/login
    @Access      : Public   
*/
const registerUser = asyncHandler(async (req, res) => {
  const { username, password } = req.body;
  if (!username || !password) {
    res.status(400);
    throw new Error("All Fields are mandatory");
  }
  const existUser = await User.findByPk(username);
  if (existUser) {
    res.status(403);
    throw new Error("User Already Exist");
  }
  const user = await User.create({ username, password });
  res.status(201).json({ Message: "User Created", User: user });
});

/*
    @Description : Register User 
    @Route       : POST /api/user/register
    @Access      : Public   
*/
const loginUser = asyncHandler(async (req, res) => {
  const { username, password } = req.body;
  if (!username || !password) {
    res.status(400);
    throw new Error("All Fields are mandatory");
  }
  const user = await User.findByPk(username);
  if (!user) {
    res.status(404);
    throw new Error("User Not Found");
  }

  if (user && (await compare(password, user.password))) {
    const token = jwt.sign(
      { user: { username: user.username } },
      process.env.ACCESS_TOKEN_SECRET,
      { expiresIn: "20m" }
    );

    res.status(200).json({ jsonWebToken: token });
  } else {
    res.status(401);
    throw new Error("Username or Password is Wrong");
  }
});

/*
    @Description : Get Current User Information
    @Route       : GET /api/user/current
    @Access      : Private   
*/
const currentUser = asyncHandler(async (req, res) => {
  res.status(200).json({ User: req.user });
});

module.exports = { registerUser, loginUser, currentUser };
