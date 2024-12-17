// const mongoose = require("mongoose");

// const userSchema = new mongoose.Schema({
//   firstName: { type: String, required: true },
//   lastName: { type: String, required: true },
//   email: { type: String, required: true, unique: true },
//   password: { type: String, required: true },
//   role: { type: String, enum: ['admin', 'supervisor', 'student'], required: true },
//   gender: { type: String },
  
//   // Fields specific to students
//   studentDetails: {
//     studentId: { type: String, unique: true, sparse: true },
//     semester: { type: String },
//     batch: { type: String },
//     registeredForProject: { type: Boolean },
//     proposalAccepted: { type: Boolean },
//     studentStatus: { type: String, enum: ["pending", "approved", "declined"], default: "pending" },
//     supervisor: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
//   },

//   // Fields specific to supervisors
//   supervisorDetails: {
//     designation: { type: String },
//   },
// }, { timestamps: true });

// module.exports = userSchema;

const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  firstName: { type: String, required: true },
  lastName: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  role: { type: String, enum: ['admin', 'supervisor', 'student'], required: true },
  gender: { type: String },
}, { timestamps: true });

module.exports = userSchema;
