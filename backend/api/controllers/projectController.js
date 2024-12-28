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

const updateProject = async (req, res, next) => {
  console.log(req.body);
  try {
    await connectToProjectDB();
    const Project = getProjectModel();
    const {
      title,
      overview,
      functionalRequirements,
      nonFunctionalRequirements,
      completedSections,
      feedback,
    } = req.body;

    const updateData = {
      title,
      overview,
      functionalRequirements,
      nonFunctionalRequirements,
      completedSections: JSON.parse(completedSections),
      $push: { feedbackList: { text: feedback, user: req.user.name } },
    };

    if (req.files) {
      if (req.files.useCaseDiagram) {
        updateData.useCaseDiagram = {
          filename: req.files.useCaseDiagram[0].filename,
          path: req.files.useCaseDiagram[0].path,
        };
      }
      if (req.files.entityRelationDiagram) {
        updateData.entityRelationDiagram = {
          filename: req.files.entityRelationDiagram[0].filename,
          path: req.files.entityRelationDiagram[0].path,
        };
      }
      if (req.files.documentation) {
        updateData.documentation = {
          filename: req.files.documentation[0].filename,
          path: req.files.documentation[0].path,
        };
      }
    }

    const updatedProject = await Project.findByIdAndUpdate(
      req.params.id,
      updateData,
      { new: true, runValidators: true }
    );

    if (!updatedProject) {
      return next(errorHandler(404, 'Project not found'));
    }

    res.status(200).json(updatedProject);
  } catch (error) {
    next(errorHandler(500, 'Error updating project'));
  }
};


module.exports = {
  getProject,
  updateProject
};
