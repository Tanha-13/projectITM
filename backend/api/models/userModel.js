const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  firstName: { type: String, required: true },
  lastName: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  studentId: { type: String, unique: true },
  gender: { type: String },
  semester: { type: String },
  batch: { type: String },
  registeredForProject: {type : Boolean},
  proposalAccepted: {type: Boolean},
  supervisor: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  password: { type: String, required: true },
  confirmPassword:{type: String},
  role: { type: String, enum: ['admin', 'supervisor', 'student'], required: true },
  studentStatus: { type: String, enum: ["pending", "approved","declined"], default: "pending" },
  },
  {timestamps: true}
);

module.exports = userSchema;
