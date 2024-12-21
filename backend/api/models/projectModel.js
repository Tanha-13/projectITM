const mongoose = require('mongoose');

const projectSchema = new mongoose.Schema({
  projectType: {type: String},
  name: { type: String, required: true },
  title: { type: String, required: true },
  description: { type: String, required: true },
  semester: {type: String},
  year: {type: Number},
  status: { type: String, enum: ['not-started','in-progress', 'completed'], default: 'not-started' },
  startDate: { type: Date, default: Date.now },
  endDate: { type: Date },
  assignee:{ type: mongoose.Schema.Types.ObjectId, ref: 'Student' },
  student: { type: mongoose.Schema.Types.ObjectId, ref: 'Student' },
  supervisor: { type: mongoose.Schema.Types.ObjectId, ref: 'Supervisor' },
  tasks: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Task' }],
}, { timestamps: true });

module.exports = projectSchema;