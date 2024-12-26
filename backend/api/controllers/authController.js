const { connectToProjectDB } = require("../config/projectDB");
const { getUserModel, connectToUserDB, getSupervisorModel, getStudentModel } = require("../config/userDB");
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
    console.log(email,password);
    await connectToUserDB();
    await connectToProjectDB();
    const User = getUserModel();
    
    const validUser = await User.findOne({ email }); 
    if (!validUser) return next(errorHandler(404, "User not found"));
    const validPassword = bcrypt.compareSync(password, validUser.password);
    if (!validPassword) return next(errorHandler(401, "Wrong credentials"));
    const Student = getStudentModel();
    let studentDetails = null;
    if(validUser.role === "student"){
      studentDetails = await Student.findOne({user:validUser._id}).populate("user")
    }
    console.log(studentDetails);

    // jwt
    const token = signToken(validUser._id);
    const { password: hashedPassword, ...rest } = validUser._doc;
    const expiryDate = new Date(Date.now() + 3600000);
    const responseData = {
      ...rest,
      studentDetails: studentDetails ? studentDetails.toObject() : null
    };
    res.cookie("access_token", token, { httpOnly: true, expires: expiryDate })
      .status(200)
      .json(responseData);
  } catch (error) {
    console.log("error is created");
  }
};

const logout = (req, res) => {
  res.clearCookie('access_token').status(200).json({ message: "Logged out successfully" });
};

module.exports = {
  login,
  logout
};
