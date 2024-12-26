const { populate } = require("dotenv");
const { connectToProjectDB, getProjectModel } = require("../config/projectDB");
const {
  connectToUserDB,
  getStudentModel,
  getSupervisorModel,
} = require("../config/userDB");
const errorHandler = require("../utils/errors");

const getProject = async (req, res, next) => {
  try {
    await connectToProjectDB();
    await connectToUserDB();
    const projectDB = getProjectModel();
    const project = await projectDB.findById(req.params.id);
    const Student = getStudentModel();
    const student = await Student.findById(project.assignee).populate({
      path:"user",
      select:"-password"
    });
    const Supervisor = getSupervisorModel();
    const projectSupervisor = await Supervisor.findById(student.supervisor).populate({
      path:"user",
      select:"-password"
    });
    project.student = student;
    project.supervisor = projectSupervisor;
    
    if (!project) {
      return next(errorHandler(404, "Project not found"));
    }
    res.status(200).json(project);
  } catch (error) {
    next(errorHandler(500, "Error getting project"));
  }
};

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

module.exports = {
  getProject,
};
