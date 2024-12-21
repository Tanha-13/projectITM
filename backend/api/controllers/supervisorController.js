const { populate } = require("dotenv");
const { connectToProjectDB, getProjectModel } = require("../config/projectDB");
const {
  connectToUserDB,
  getSupervisorModel,
  getStudentModel,
  getUserModel,
} = require("../config/userDB");
const errorHandler = require("../utils/errors");
const nodemailer = require("nodemailer");

const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: process.env.USER_EMAIL,
    pass: process.env.USER_PASSWORD,
  },
});

const getStudents = async (req, res) => {
  try {
    await connectToUserDB();
    const { id } = req.params;
    const Supervisor = getSupervisorModel();
    const Student = getStudentModel();
    const supervisor = await Supervisor.findOne({ user: id });

    if (!supervisor) {
      return res.status(404).json({ message: "Supervisor not found" });
    }
    const students = await Student.find({ supervisor: supervisor.id })
      .populate({
        path: "user",
        select: "-password",
      })
      .lean();

    if (students.length === 0) {
      return res
        .status(404)
        .json({ message: "No students found for this supervisor" });
    }

    res.status(200).json(students);
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Error fetching students" });
  }
};

const getProjectDetails = async (req, res) => {
  try {
    await connectToProjectDB();
    await connectToUserDB();
    const Project = getProjectModel();
    const Student = getStudentModel();
    const Supervisor = getSupervisorModel();
    const { id } = req.params;
    const {
      projectType,
      name,
      title,
      description,
      semester,
      year,
      startDate,
      endDate,
      assignee,
    } = req.body;
    console.log(req.body);
    const supervisor = await Supervisor.findOne({ user: id });
    if (!supervisor) {
      return res.status(404).json({ message: "Supervisor not found" });
    }

    // Find the student
    const student = await Student.findById(assignee)
      .populate("user")
      .populate({
        path: "supervisor",
        populate: { path: "user" },
      });
    if (!student) {
      return res.status(404).json({ message: "Student not found" });
    }
    console.log(supervisor);
    const newProject = new Project({
      projectType,
      name,
      title,
      description,
      semester,
      year,
      startDate,
      endDate,
      status: "not-started",
      assignee,
      student: {
        _id: student._id,
        userId: student.user._id,
        firstName: student.user.firstName,
        lastName: student.user.lastName,
        email: student.user.email,
        studentId: student.studentId,
        semester: student.semester,
        batch: student.batch
      },
      supervisor: {
        _id: supervisor._id,
        userId: supervisor.user._id,
        firstName: supervisor.user.firstName,
        lastName: supervisor.user.lastName,
        email: supervisor.user.email,
        designation: supervisor.designation
      }
    });
    await newProject.save();

    supervisor.projects.push(newProject._id);
    await supervisor.save();

    // Update student's project and status
    student.project = newProject._id;
    student.registeredForProject = true;
    await student.save();

    try {
      await transporter.sendMail({
        from: process.env.USER_EMAIL,
        to: student.user.email,
        subject: "Your Login Credentials for ProjectITM",
        text: `Hello ${student.user.firstName} ${student.user.lastName},\n\nYour account has been approved for ProjectITM. Please login to the system to check details about project and your supervisor.\n\nThank you`,
      });
    } catch (emailError) {
      console.error("Error sending email:", emailError);
    }

    res.status(201).json({
      message: "Project created successfully",
      project: newProject,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Error fetching project details" });
  }
};

const semesterProjects = async (req, res) => {
  try {
    await connectToProjectDB();
    await connectToUserDB();

    const { id } = req.params;
    const Project = getProjectModel();
    const Supervisor = getSupervisorModel();
    const supervisor = await Supervisor.findOne({ user: id }).populate("user");
    console.log(supervisor);
    if (!supervisor) {
      return res.status(404).json({ message: "Supervisor not found" });
    }

    const projects = await Project.find({
      $or: [
        { supervisor: supervisor._id },
        { supervisor: supervisor.user._id }
      ]
    }).lean();
    console.log(projects.length);

    for (let project of projects) {
      if (project.assignee) {
        const Student = getStudentModel();
        const student = await Student.findById(project.assignee).populate(
          "user"
        ).lean();
        if (student) {
          project.student = {
            _id: student.user._id,
            firstName: student.user.firstName,
            lastName: student.user.lastName,
            email: student.user.email,
            studentId: student.studentId,
            semester: student.semester,
            batch: student.batch,
          };
        }
      }
      project.supervisor = {
        _id: supervisor.user._id,
        firstName: supervisor.user.firstName,
        lastName: supervisor.user.lastName,
        email: supervisor.user.email,
      };
    }

    res.status(200).json(projects);
  } catch (err) {
    console.log(err);
  }
};

const updateProjects = async (req, res, next) => {
  try {

    await connectToProjectDB();
    const Project = getProjectModel();
    const { id, projectId } = req.params;
    const updateData = req.body;
    console.log(id,projectId,updateData);

    const updatedProject = await Project.findByIdAndUpdate(
      projectId,
      updateData,
      { new: true }
    );

    if (!updatedProject) {
      return res.status(404).json({ message: "Project not found" });
    }

    res.status(200).json(updatedProject);
  } catch (error) {
    console.error("Error updating project:", error);
    res.status(500).json({ message: "Error updating project" });
  }
};
const deleteProjects = async (req, res, next) => {
  try {
    await connectToProjectDB();
    const Project = getProjectModel();
    const { id, projectId } = req.params;

    const deletedProject = await Project.findByIdAndDelete(projectId);

    if (!deletedProject) {
      return res.status(404).json({ message: "Project not found" });
    }

    res.status(200).json({ message: "Project deleted successfully" });
  } catch (error) {
    console.error("Error deleting project:", error);
    res.status(500).json({ message: "Error deleting project" });
  }
};
const updateStatusProjects = async (req, res, next) => {
  const { id, projectId } = req.params;
  console.log(id, projectId);
  try {
    await connectToProjectDB();
    const Project = getProjectModel();
    const { id, projectId } = req.params;
    console.log(id, projectId);
    const { status } = req.body;

    const updatedProject = await Project.findByIdAndUpdate(
      projectId,
      { status },
      { new: true }
    );

    if (!updatedProject) {
      return res.status(404).json({ message: "Project not found" });
    }

    res.status(200).json(updatedProject);
  } catch (error) {
    console.error("Error updating project status:", error);
    res.status(500).json({ message: "Error updating project status" });
  }
};

const getSupervisorProfile = async (req, res, next) => {
  try {
    await connectToUserDB();
    const Supervisor = getSupervisorModel();
    const { id } = req.params;
    const supervisor = await Supervisor.findOne({ user: id })
      .populate("user", "-password")
      .populate({
        path: "students",
        populate: { path: "user", select: "firstName lastName email" },
      });
    if (!supervisor) {
      return res.status(404).json({ message: "Supervisor not found" });
    }
    res.status(200).json({
      ...supervisor.toObject(),
      ...supervisor.user.toObject(),
      department: "Department of Information Technology & Management (ITM)",
      faculty: "Faculty of Science and Information Technology",
    });
  } catch (error) {
    next(errorHandler(500, "Error getting supervisor profile"));
  }
};

const editSupervisorProfile = async (req, res, next) => {
  try {
    await connectToUserDB();
    const Supervisor = getSupervisorModel();
    const User = getUserModel();
    const { id } = req.params;
    const { firstName, lastName, email, designation } = req.body;

    const supervisor = await Supervisor.findOne({ user: id });
    if (!supervisor) {
      return res.status(404).json({ message: "Supervisor not found" });
    }

    await User.findByIdAndUpdate(supervisor.user, {
      firstName,
      lastName,
      email,
    });

    supervisor.designation = designation;
    await supervisor.save();

    const updatedSupervisor = await Supervisor.findOne({ user: id })
      .populate("user", "-password")
      .populate({
        path: "students",
        populate: { path: "user", select: "firstName lastName email" },
      });

    res.status(200).json({
      ...updatedSupervisor.toObject(),
      ...updatedSupervisor.user.toObject(),
      department: "Department of Information Technology & Management (ITM)",
      faculty: "Faculty of Science and Information Technology",
    });
  } catch (error) {
    next(errorHandler(500, "Error updating supervisor profile"));
  }
};

module.exports = {
  getStudents,
  getProjectDetails,
  semesterProjects,
  updateProjects,
  deleteProjects,
  updateStatusProjects,
  getSupervisorProfile,
  editSupervisorProfile,
};
