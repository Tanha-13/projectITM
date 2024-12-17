const dotenv = require("dotenv");
const { connectToDatabase } = require("../utils/dbConnection");
dotenv.config();

const uri = process.env.PROJECT_DB_URI;
const dbName = "project";

const connectToProjectDB = () => connectToDatabase({uri, dbName});

module.exports = {
  connectToProjectDB,
};
