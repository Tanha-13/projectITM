const mongoose = require("mongoose");

const projectSchema = new mongoose.Schema(
  {
    projectType: { type: String },
    name: { type: String, required: true },
    title: { type: String, required: true },
    description: { type: String, required: true },
    overview: { type: String },
    functionalRequirements: { type: String },
    nonFunctionalRequirements: { type: String },
    semester: { type: String },
    year: { type: Number },
    status: {
      type: String,
      enum: ["Not started", "In progress", "Completed"],
      default: "Not started",
    },
    startDate: { type: Date, default: Date.now },
    endDate: { type: Date },
    assignee: { type: mongoose.Schema.Types.ObjectId, ref: "Student" },
    student: { type: mongoose.Schema.Types.ObjectId, ref: "Student" },
    supervisor: { type: mongoose.Schema.Types.ObjectId, ref: "Supervisor" },
    tasks: [{ type: mongoose.Schema.Types.ObjectId, ref: "Task" }],
    useCaseDiagram: {
      filename: String,
      path: String,
    },
    entityRelationDiagram: {
      filename: String,
      path: String,
    },
    documentation: {
      filename: String,
      path: String,
    },
    completedSections: {
      projectTitle: { type: Boolean, default: false },
      projectOverview: { type: Boolean, default: false },
      functionalRequirements: { type: Boolean, default: false },
      nonFunctionalRequirements: { type: Boolean, default: false },
      useCaseDiagram: { type: Boolean, default: false },
      entityRelationDiagram: { type: Boolean, default: false },
      documentation: { type: Boolean, default: false },
    },
    feedbackList: [{
      text: String,
      user: String,
      createdAt: { type: Date, default: Date.now },
      replies: [{
        text: String,
        user: String,
        createdAt: { type: Date, default: Date.now },
      }],
    }],
  },
  { timestamps: true }
);

module.exports = projectSchema;

