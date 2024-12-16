const { getUserModel, connectToUserDB } = require("../config/userDB");
const User = require("../models/userModel");
const errorHandler = require("../utils/errors");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
require("dotenv").config();

const signToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_EXPIRES_IN || "1d",
  });
};

const login = async (req, res, next) => {
    
  try {

    const { email, password } = req.body;
    await connectToUserDB();
    const User = getUserModel();
    
    const validUser = await User.findOne({ email }); 
    if (!validUser) return next(errorHandler(404, "User not found"));
    const validPassword = bcrypt.compareSync(password, validUser.password);
    if (!validPassword) return next(errorHandler(401, "Wrong credentials"));

    // jwt
    const token = signToken(validUser._id);
    const { password: hashedPassword, ...rest } = validUser._doc;
    const expiryDate = new Date(Date.now() + 3600000);
    res.cookie("access_token", token, { httpOnly: true, expires: expiryDate })
      .status(200)
      .json(rest);
  } catch (error) {
    console.log("error is created");
  }
};

module.exports = {
  login,
};
