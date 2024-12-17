const mongoose = require("mongoose");

const studentSchema = new mongoose.Schema({
  user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  studentId: { type: String, required: true, unique: true },
  semester: { type: String },
  batch: { type: String },
  registeredForProject: { type: Boolean },
  proposalAccepted: { type: Boolean },
  studentStatus: { type: String, enum: ["pending", "approved", "declined"], default: "pending" },
  supervisor: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
}, { timestamps: true });

module.exports = studentSchema;

