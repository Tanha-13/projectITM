const mongoose = require('mongoose');

const projectSchema = new mongoose.Schema({
  name: { type: String, required: true },
  title: { type: String, required: true },
  description: { type: String, required: true },
  semester: {type: String},
  year: {type: Date},
  status: { type: String, enum: ['not-started','in-progress', 'completed'], default: 'not-started' },
  startDate: { type: Date, default: Date.now },
  endDate: { type: Date },
  assignee:{type: String},
  student: { type: mongoose.Schema.Types.ObjectId, ref: 'Student', required: true },
  supervisor: { type: mongoose.Schema.Types.ObjectId, ref: 'Supervisor', required: true },
  tasks: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Task' }],
}, { timestamps: true });

module.exports = projectSchema;