const mongoose = require("mongoose");

const studentSchema = new mongoose.Schema(
  {
    user: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
    studentId: { type: String, required: true, unique: true },
    semester: { type: String, required: true },
    batch: { type: String, required: true },
    registeredForProject: { type: Boolean, default: false },
    proposalAccepted: { type: Boolean, default: false },
    supervisor: { type: mongoose.Schema.Types.ObjectId, ref: "Supervisor" },
    project: { type: mongoose.Schema.Types.ObjectId, ref: "Project" },
    studentStatus: {
      type: String,
      enum: ["pending", "approved", "rejected"],
      default: "pending",
    },
  },
  { timestamps: true }
);

module.exports = studentSchema;
