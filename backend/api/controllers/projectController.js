const { connectToProjectDB, getProjectModel } = require("../config/projectDB");
const {
  connectToUserDB,
  getStudentModel,
  getSupervisorModel,
} = require("../config/userDB");
const errorHandler = require("../utils/errors");
const path = require("path");
const fs = require("fs").promises;

const getProject = async (req, res, next) => {
  try {
    await connectToProjectDB();
    await connectToUserDB();
    const projectDB = getProjectModel();
    const project = await projectDB.findById(req.params.id);
    const Student = getStudentModel();
    const student = await Student.findById(project.assignee).populate({
      path: "user",
      select: "-password",
    });
    const Supervisor = getSupervisorModel();
    const projectSupervisor = await Supervisor.findById(
      student.supervisor
    ).populate({
      path: "user",
      select: "-password",
    });
    project.student = student;
    project.supervisor = projectSupervisor;

    if (!project) {
      return next(errorHandler(404, "Project not found"));
    }

    // Add URLs to the response
    if (project.useCaseDiagram) {
      project.useCaseDiagram.url = `${req.protocol}://${req.get("host")}/api/uploads/${project.useCaseDiagram.filename}`;
    }
    if (project.entityRelationDiagram) {
      project.entityRelationDiagram.url = `${req.protocol}://${req.get("host")}/api/uploads/${project.entityRelationDiagram.filename}`;
    }
    if (project.documentation) {
      project.documentation.url = `${req.protocol}://${req.get("host")}/api/uploads/${project.documentation.filename}`;
    }

    res.status(200).json(project);
  } catch (error) {
    next(errorHandler(500, "Error getting project"));
  }
};

const updateProject = async (req, res, next) => {
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
      deletedFiles,
    } = req.body;

    const updateData = {
      title: title || undefined,
      overview: overview || undefined,
      functionalRequirements: functionalRequirements || undefined,
      nonFunctionalRequirements: nonFunctionalRequirements || undefined,
      completedSections: completedSections
        ? JSON.parse(completedSections)
        : undefined,
    };

    if (feedback) {
      updateData.$push = { feedbackList: { text: feedback, user: "" } };
    }

    if (req.files) {
      if (req.files.useCaseDiagram) {
        updateData.useCaseDiagram = {
          filename: req.files.useCaseDiagram[0].filename,
          path: `/uploads/${req.files.useCaseDiagram[0].filename}`,
        };
      }

      if (req.files.entityRelationDiagram) {
        updateData.entityRelationDiagram = {
          filename: req.files.entityRelationDiagram[0].filename,
          path:`/uploads/${req.files.entityRelationDiagram[0].filename}`,
        };
      }

      if (req.files.documentation) {
        updateData.documentation = {
          filename: req.files.documentation[0].filename,
          path: `/uploads/${req.files.documentation[0].filename}`,
        };
      }
    }

    // Handle deleted files
    if (deletedFiles) {
      const filesToDelete = JSON.parse(deletedFiles);
      for (const file of filesToDelete) {
        updateData[file.type] = null;
        const filePath = path.join(__dirname, "..", "uploads", file.filename);
        await fs
          .unlink(filePath)
          .catch((err) =>
            console.error(`Failed to delete file ${file.filename}:`, err)
          );
      }
    }

    const updatedProject = await Project.findByIdAndUpdate(
      req.params.id,
      updateData,
      { new: true, runValidators: true }
    );
    console.log(updateProject);
    if (!updatedProject) {
      return next(errorHandler(404, "Project not found"));
    }

    // Add URLs to the response
    if (updatedProject.useCaseDiagram) {
      updatedProject.useCaseDiagram.url = `${req.protocol}://${req.get("host")}/api/uploads/${updatedProject.useCaseDiagram.filename}`;
    }
    if (updatedProject.entityRelationDiagram) {
      updatedProject.entityRelationDiagram.url = `${req.protocol}://${req.get("host")}/api/uploads/${updatedProject.entityRelationDiagram.filename}`;
    }
    if (updatedProject.documentation) {
      updatedProject.documentation.filename = `${updatedProject?.user?.firstName}-${updatedProject?.user?.lastName}_${updatedProject?.studentId}`;
    }

    res.status(200).json(updatedProject);
  } catch (error) {
    next(errorHandler(500, "Error updating project: " + error.message));
  }
};

module.exports = {
  getProject,
  updateProject,
};
