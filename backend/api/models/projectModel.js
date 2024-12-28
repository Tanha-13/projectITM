const mongoose = require("mongoose");

const projectSchema = new mongoose.Schema(
  {
    projectType: { type: String },
    name: { type: String, required: true },
    title: { type: String, required: true },
    description: { type: String, required: true },
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
    feedback: String,
  },
  { timestamps: true }
);

module.exports = projectSchema;
