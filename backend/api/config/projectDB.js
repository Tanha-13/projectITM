const dotenv = require("dotenv");
const { connectToDatabase, disconnectFromDatabase } = require("../utils/dbConnection");
dotenv.config();

const uri = process.env.PROJECT_DB_URI;
const dbName = "project";

const connectToProjectDB = () => connectToDatabase({uri, dbName});
const disconnectFromProjectDB = () => disconnectFromDatabase(dbName);

module.exports = {
  connectToProjectDB,
  disconnectFromProjectDB,
};
