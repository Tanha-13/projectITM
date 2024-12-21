const dotenv = require("dotenv");
const mongoose = require("mongoose");
const projectSchema = require("../models/projectModel");
const taskSchema = require("../models/taskModel");
const studentSchema = require("../models/studentModel");
const supervisorSchema = require("../models/supervisorModel");
dotenv.config();

const uri = process.env.PROJECT_DB_URI;
const dbName = "project";

let projectConnection;
let Project, Task, Student, Supervisor;

const connectToProjectDB = async () => {
  if(!projectConnection){
    projectConnection = await mongoose.createConnection(uri, {
      dbName: dbName,
    });
    Project = projectConnection.model("Project", projectSchema);
    Task = projectConnection.model("Task", taskSchema);
    Student = projectConnection.model("Student",studentSchema);
    Supervisor = projectConnection.model("Supervisor",supervisorSchema);
    console.log("Connected to project and task database");
  }
  return projectConnection;
}

const getProjectModel = () => {
  if (!Project) {
    throw new Error("Project model not initialized. Call connectToProjectDB first.");
  }
  return Project;
};

const getTaskModel = () => {
  if (!Task) {
    throw new Error("Task model not initialized. Call connectToProjectDB first.");
  }
  return Task;
};

module.exports = {
  connectToProjectDB,
  getProjectModel,
  getTaskModel
};
