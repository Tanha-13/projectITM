const dotenv = require("dotenv");
const { connectToDatabase, disconnectFromDatabase } = require("../utils/dbConnection");
dotenv.config();

const uri = process.env.USER_DB_URI;
const dbName = "user";

const connectToUserDB = () => connectToDatabase({uri, dbName});
const disconnectFromUserDB = () => disconnectFromDatabase(connectToUserDB);

module.exports = {
  connectToUserDB,
  disconnectFromUserDB,
};
