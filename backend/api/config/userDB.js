const dotenv = require("dotenv");
const {
  connectToDatabase,
  disconnectFromDatabase,
} = require("../utils/dbConnection");
const userSchema = require("../models/userModel");
dotenv.config();

const uri = process.env.USER_DB_URI;
const dbName = "user";

let userConnection;
let User;

const connectToUserDB = async () => {
  userConnection = await connectToDatabase({ uri, dbName });
  User = userConnection.model("User", userSchema);
  return userConnection;
};
const disconnectFromUserDB = async () => {
  if (!userConnection) return;
    await disconnectFromDatabase(dbName);
    userConnection = null;
    User = null;
  
};

const getUserModel = () => {
  if (!User) {
    throw new Error("User model not initialized. Call connectToUserDB first.");
  }
  return User;
};

module.exports = {
  connectToUserDB,
  disconnectFromUserDB,
  getUserModel,
};
