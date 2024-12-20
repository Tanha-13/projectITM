// const { connectToProjectDB, getProjectModel } = require('../config/projectDB');
// const { connectToUserDB, getStudentModel, getSupervisorModel } = require('../config/userDB');
// const errorHandler = require('../utils/errors');

// exports.createProject = async (req, res, next) => {
//   try {
//     await connectToProjectDB();
//     await connectToUserDB();
//     const Project = getProjectModel();
//     const Student = getStudentModel();
//     const Supervisor = getSupervisorModel();

//     const { title, description, studentId, supervisorId } = req.body;

//     const student = await Student.findById(studentId);
//     const supervisor = await Supervisor.findById(supervisorId);

//     if (!student || !supervisor) {
//       return next(errorHandler(404, 'Student or Supervisor not found'));
//     }

//     const newProject = new Project({
//       title,
//       description,
//       student: studentId,
//       supervisor: supervisorId,
//     });

//     await newProject.save();

//     student.project = newProject._id;
//     await student.save();

//     supervisor.projects.push(newProject._id);
//     await supervisor.save();

//     res.status(201).json(newProject);
//   } catch (error) {
//     next(errorHandler(500, 'Error creating project'));
//   }
// };

// exports.getProject = async (req, res, next) => {
//   try {
//     await connectToProjectDB();
//     const Project = getProjectModel();
//     const project = await Project.findById(req.params.id)
//       .populate('student', 'studentId')
//       .populate('supervisor', 'user')
//       .populate('tasks');
//     if (!project) {
//       return next(errorHandler(404, 'Project not found'));
//     }
//     res.status(200).json(project);
//   } catch (error) {
//     next(errorHandler(500, 'Error getting project'));
//   }
// };

// exports.updateProject = async (req, res, next) => {
//   try {
//     await connectToProjectDB();
//     const Project = getProjectModel();
//     const updatedProject = await Project.findByIdAndUpdate(req.params.id, req.body, { new: true });
//     if (!updatedProject) {
//       return next(errorHandler(404, 'Project not found'));
//     }
//     res.status(200).json(updatedProject);
//   } catch (error) {
//     next(errorHandler(500, 'Error updating project'));
//   }
// };

// exports.deleteProject = async (req, res, next) => {
//   try {
//     await connectToProjectDB();
//     await connectToUserDB();
//     const Project = getProjectModel();
//     const Student = getStudentModel();
//     const Supervisor = getSupervisorModel();

//     const project = await Project.findById(req.params.id);
//     if (!project) {
//       return next(errorHandler(404, 'Project not found'));
//     }

//     await Student.findByIdAndUpdate(project.student, { $unset: { project: 1 } });
//     await Supervisor.findByIdAndUpdate(project.supervisor, { $pull: { projects: project._id } });

//     await Project.findByIdAndDelete(req.params.id);
//     res.status(200).json({ message: 'Project deleted successfully' });
//   } catch (error) {
//     next(errorHandler(500, 'Error deleting project'));
//   }
// };

// exports.getAllProjects = async (req, res, next) => {
//   try {
//     await connectToProjectDB();
//     const Project = getProjectModel();
//     const projects = await Project.find()
//       .populate('student', 'studentId')
//       .populate('supervisor', 'user')
//       .populate('tasks');
//     res.status(200).json(projects);
//   } catch (error) {
//     next(errorHandler(500, 'Error getting all projects'));
//   }
// };

