// const { connectToProjectDB, getProjectModel, getTaskModel } = require('../config/projectDB');
// const errorHandler = require('../utils/errors');

// exports.createTask = async (req, res, next) => {
//   try {
//     await connectToProjectDB();
//     const Task = getTaskModel();
//     const Project = getProjectModel();

//     const { title, description, projectId, dueDate } = req.body;

//     const project = await Project.findById(projectId);
//     if (!project) {
//       return next(errorHandler(404, 'Project not found'));
//     }

//     const newTask = new Task({
//       title,
//       description,
//       project: projectId,
//       dueDate,
//     });

//     await newTask.save();

//     project.tasks.push(newTask._id);
//     await project.save();

//     res.status(201).json(newTask);
//   } catch (error) {
//     next(errorHandler(500, 'Error creating task'));
//   }
// };

// exports.getTask = async (req, res, next) => {
//   try {
//     await connectToProjectDB();
//     const Task = getTaskModel();
//     const task = await Task.findById(req.params.id).populate('project', 'title');
//     if (!task) {
//       return next(errorHandler(404, 'Task not found'));
//     }
//     res.status(200).json(task);
//   } catch (error) {
//     next(errorHandler(500, 'Error getting task'));
//   }
// };

// exports.updateTask = async (req, res, next) => {
//   try {
//     await connectToProjectDB();
//     const Task = getTaskModel();
//     const updatedTask = await Task.findByIdAndUpdate(req.params.id, req.body, { new: true });
//     if (!updatedTask) {
//       return next(errorHandler(404, 'Task not found'));
//     }
//     res.status(200).json(updatedTask);
//   } catch (error) {
//     next(errorHandler(500, 'Error updating task'));
//   }
// };

// exports.deleteTask = async (req, res, next) => {
//   try {
//     await connectToProjectDB();
//     const Task = getTaskModel();
//     const Project = getProjectModel();

//     const task = await Task.findById(req.params.id);
//     if (!task) {
//       return next(errorHandler(404, 'Task not found'));
//     }

//     await Project.findByIdAndUpdate(task.project, { $pull: { tasks: task._id } });

//     await Task.findByIdAndDelete(req.params.id);
//     res.status(200).json({ message: 'Task deleted successfully' });
//   } catch (error) {
//     next(errorHandler(500, 'Error deleting task'));
//   }
// };

// exports.getAllTasks = async (req, res, next) => {
//   try {
//     await connectToProjectDB();
//     const Task = getTaskModel();
//     const tasks = await Task.find().populate('project', 'title');
//     res.status(200).json(tasks);
//   } catch (error) {
//     next(errorHandler(500, 'Error getting all tasks'));
//   }
// };

