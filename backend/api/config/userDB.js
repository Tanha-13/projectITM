const mongoose = require("mongoose");
const dotenv = require("dotenv");
const userSchema = require("../models/userModel");
const studentSchema = require("../models/studentModel");
const supervisorSchema = require("../models/supervisorModel");

dotenv.config();

const uri = process.env.USER_DB_URI;
const dbName = "user";

let userConnection;
let User, Student, Supervisor;

const connectToUserDB = async () => {
  if (!userConnection) {
    userConnection = await mongoose.createConnection(uri, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      dbName: dbName,
    });
    User = userConnection.model("User", userSchema);
    Student = userConnection.model("Student", studentSchema);
    Supervisor = userConnection.model("Supervisor", supervisorSchema);
    console.log("Connected to user database");
  }
  return userConnection;
};

const getUserModel = () => {
  if (!User) {
    throw new Error("User model not initialized. Call connectToUserDB first.");
  }
  return User;
};

const getStudentModel = () => {
  if (!Student) {
    throw new Error("Student model not initialized. Call connectToUserDB first.");
  }
  return Student;
};

const getSupervisorModel = () => {
  if (!Supervisor) {
    throw new Error("Supervisor model not initialized. Call connectToUserDB first.");
  }
  return Supervisor;
};

module.exports = {
  connectToUserDB,
  getUserModel,
  getStudentModel,
  getSupervisorModel,
};

