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
    const supervisor = await Supervisor.findOne({ user: id }).populate({
      path: "students",
      populate: {
        path: "user",
        select: "-password",
      },
    });

    if (!supervisor) {
      return res.status(404).json({ message: "Supervisor not found" });
    }

    if (supervisor.students.length === 0) {
      return res
        .status(404)
        .json({ message: "No students found for this supervisor" });
    }

    res.status(200).json(supervisor.students);
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Error fetching students" });
  }
};

const getProjectDetails = async (req, res) => {
  try {
    await connectToProjectDB();
    await connectToUserDB();
    console.log(req.body);
    const Project = getProjectModel();
    const Student = getStudentModel();
    const Supervisor = getSupervisorModel();
    const { id } = req.params;
    const {
      name,
      title,
      description,
      semester,
      year,
      startDate,
      endDate,
      assignee,
    } = req.body;
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
    console.log(student.user);
    const newProject = new Project({
      name,
      title,
      description,
      semester,
      year,
      startDate,
      endDate,
      status: "not-started",
      assignee,
      student: student._id,
      supervisor: supervisor._id,
    });

    // Save the new project
    await newProject.save();

    // Update supervisor's projects
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
    console.log(supervisor);
    console.log();
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Error fetching project details" });
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
  getSupervisorProfile,
  editSupervisorProfile,
};
