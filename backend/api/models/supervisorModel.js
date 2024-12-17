const mongoose = require("mongoose");

const supervisorSchema = new mongoose.Schema({
  user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  designation: { type: String },
}, { timestamps: true });

module.exports = supervisorSchema;