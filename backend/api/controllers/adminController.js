const {
  getUserModel,
  getSupervisorModel,
  connectToUserDB,
  getStudentModel,
} = require("../config/userDB");
const nodemailer = require("nodemailer");
const bcrypt = require("bcryptjs");
const errorHandler = require("../utils/errors");
const { connectToProjectDB, getProjectModel } = require("../config/projectDB");

const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: process.env.USER_EMAIL,
    pass: process.env.USER_PASSWORD,
  },
});

const addSupervisor = async (req, res, next) => {
  try {
    await connectToUserDB();
    const User = getUserModel();
    const Supervisor = getSupervisorModel();
    console.log("Request body:", req.body);
    const { firstName, lastName, email, designation, gender, tempPassword } =
      req.body;

    // Check if user already exists
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res
        .status(400)
        .json({ message: "User with this email already exists" });
    }

    const hashedPassword = await bcrypt.hash(tempPassword, 12);

    // Create new user
    const newUser = new User({
      firstName,
      lastName,
      email,
      gender,
      password: hashedPassword,
      role: "supervisor",
    });
    await newUser.save();

    // Create new supervisor
    const newSupervisor = new Supervisor({
      user: newUser._id,
      designation,
    });
    await newSupervisor.save();

    console.log("New supervisor object:", newSupervisor);

    try {
      await transporter.sendMail({
        from: process.env.USER_EMAIL,
        to: email,
        subject: "Your Supervisor Account",
        text: `Hello ${firstName} ${lastName},\n\nYour supervisor account has been created for ProjectITM.\n\nHere are your credentials:\nYour email: ${email}\nYour Temporary Password: ${tempPassword}\n\nWelcome to ProjectITM - "https://projectitm.netlify.app/"\n\n\nThank you`,
      });
    } catch (emailError) {
      console.error("Error sending email:", emailError);
      // The supervisor is still created, we just couldn't send the email
    }

    res.status(201).json({
      message: "Supervisor added successfully. Email might not have been sent.",
      supervisor: newSupervisor,
    });
  } catch (error) {
    console.error("Error in addSupervisor:", error);
    res
      .status(500)
      .json({ message: "Error adding supervisor", error: error.message });
  }
};

const allSupervisors = async (req, res, next) => {
  try {
    await connectToUserDB();
    const User = getUserModel();
    const Supervisor = getSupervisorModel();
    const supervisors = await Supervisor.find().populate("user");
    res.status(200).json(supervisors);
  } catch (error) {
    console.error("Error in allSupervisors:", error);
    next(errorHandler(400, "Failed to load all supervisors data"));
  }
};

const updateSupervisor = async (req, res, next) => {
  try {
    await connectToUserDB();
    const User = getUserModel();
    const Supervisor = getSupervisorModel();
    const { id } = req.params;
    const updateData = req.body;
    console.log(updateData);

    const supervisor = await Supervisor.findById(id);
    console.log(supervisor);
    if (!supervisor) {
      return res.status(404).json({ message: "Supervisor not found" });
    }

    // Update user data
    await User.findByIdAndUpdate(supervisor.user, {
      firstName: updateData.user.firstName,
      lastName: updateData.user.lastName,
      email: updateData.user.email,
    });

    // Update supervisor data
    const updatedSupervisor = await Supervisor.findByIdAndUpdate(
      id,
      {
        designation: updateData.designation,
      },
      { new: true }
    ).populate("user");

    res.status(200).json(updatedSupervisor);
  } catch (error) {
    console.error("Error in updateSupervisor:", error);
    res
      .status(500)
      .json({ message: "Error updating supervisor", error: error.message });
  }
};

const deleteSupervisor = async (req, res, next) => {
  try {
    await connectToUserDB();
    const User = getUserModel();
    const Supervisor = getSupervisorModel();
    const { id } = req.params;

    const supervisor = await Supervisor.findById(id);
    if (!supervisor) {
      return res.status(404).json({ message: "Supervisor not found" });
    }

    // Delete supervisor
    await Supervisor.findByIdAndDelete(id);

    // Delete associated user
    await User.findByIdAndDelete(supervisor.user);

    res.status(200).json({ message: "Supervisor deleted successfully" });
  } catch (error) {
    console.error("Error in deleteSupervisor:", error);
    res
      .status(500)
      .json({ message: "Error deleting supervisor", error: error.message });
  }
};

// student registration
const getStudentDetails = async (req, res, next) => {
  try {
    await connectToUserDB();
    const User = getUserModel();
    const Student = getStudentModel();
    const Supervisor = getSupervisorModel();
    console.log(req.body);
    const {
      firstName,
      lastName,
      email,
      studentId,
      gender,
      semester,
      batch,
      registeredForProject,
      proposalAccepted,
      supervisor,
      password,
    } = req.body;

    const existingUser = await User.findOne({ email });
    console.log(existingUser);
    if (existingUser) {
      return res.status(400).json({ message: "User already exists" });
    }
    const hashedPassword = bcrypt.hashSync(password, 15);
    const newUser = new User({
      firstName,
      lastName,
      email,
      password: hashedPassword,
      role: "student",
      gender,
    });

    await newUser.save();
    const newStudent = new Student({
      user: newUser._id,
      studentId,
      semester,
      batch,
      registeredForProject: registeredForProject === "yes",
      proposalAccepted: proposalAccepted === "yes",
      supervisor,
      studentStatus: "pending",
    });
    await newStudent.save();

    // Update the supervisor's students array
    await Supervisor.findByIdAndUpdate(
      supervisor,
      { $push: { students: newStudent._id } },
      { new: true }
    );

    res.status(200).json({ message: "Data received successfully" });
  } catch (err) {
    console.log(err);
    next(errorHandler(500, "registration unsuccessful"));
  }
};

//all students
const allStudents = async (req, res, next) => {
  try {
    await connectToUserDB();
    const User = getUserModel();
    const Student = getStudentModel();
    const students = await Student.find()
      .populate("user")
      .populate({
        path: "supervisor",
        populate: { path: "user" },
      });
    res.status(200).json(students);
  } catch (err) {
    next(errorHandler(400, "Failed to load all students data"));
  }
};


// update student status
const updateStudentStatus = async (req, res, next) => {
  try {
    await connectToUserDB();
    const Student = getStudentModel();
    const User = getUserModel();
    const { id } = req.params;
    const { status } = req.body;
    console.log(id, status);
    const updatedStudent = await Student.findByIdAndUpdate(
      id,
      { studentStatus: status },
      { new: true }
    )
      .populate("user")
      .populate({
        path: "supervisor",
        populate: { path: "user" },
      });
    console.log(updatedStudent);

    if (status === "approved") {
      // Send email to supervisor
      const supervisor = await User.findById(
        updatedStudent.supervisor.user._id
      );
      console.log(supervisor);
      if (supervisor) {
        await transporter.sendMail({
          from: process.env.USER_EMAIL,
          to: supervisor.email,
          subject: "New Student Registration",
          text: `Hello ${supervisor.firstName} ${supervisor.lastName},

A new student has been registered and approved for your supervision:

Student Name: ${updatedStudent.user.firstName} ${updatedStudent.user.lastName}
Student ID: ${updatedStudent.studentId}
Email: ${updatedStudent.user.email}

Please create the necessary project for your student.

Thank you`,
        });
      }
    }

    res.status(200).json(updatedStudent);
  } catch (error) {
    console.error("Error in updateStudentStatus:", error);
    next(errorHandler(500, "Error updating student status"));
  }
};

// student list by status
const getStudentsByStatus = async (req, res, next) => {
  try {
    await connectToUserDB();
    const Student = getStudentModel();
    const { status } = req.query;
    const students = await Student.find({ studentStatus: status })
      .populate("user")
      .populate({
        path: "supervisor",
        populate: { path: "user" },
      });
    res.status(200).json(students);
  } catch (error) {
    console.error("Error in getStudentsByStatus:", error);
    next(errorHandler(400, "Failed to load students data"));
  }
};

//delete student
const deleteStudent = async(req,res,next) => {
  try {
    await connectToUserDB();
    const User = getUserModel();
    const Student = getStudentModel();
    const { id } = req.params;

    const student = await Student.findById(id);
    if (!student) {
      return res.status(404).json({ message: "Supervisor not found" });
    }

    // Delete supervisor
    await Student.findByIdAndDelete(id);

    // Delete associated user
    await User.findByIdAndDelete(student.user);
    res.status(200).json({ message: "Supervisor deleted successfully" });
  } catch (error) {
    console.error("Error in deleteSupervisor:", error);
    res
      .status(500)
      .json({ message: "Error deleting supervisor", error: error.message });
  }
}

// get semester projects
const adminSemesterProjects = async (req, res, next) => {
  try {
    await connectToProjectDB();
    const Project = getProjectModel();
    const projects = await Project.find()
      .populate({
        path: "student",
        populate: { path: "user", select: "-password" },
      })
      .populate({
        path: "supervisor",
        populate: { path: "user", select: "-password" },
      });


    const enrichedProjects = await Promise.all(
      projects.map(async (project) => {
        // Enrich student details if project has an assignee
        if (project.assignee) {
          const Student = getStudentModel();
          const student = await Student.findById(project.assignee).populate("user");
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

        // Enrich supervisor details if present
        if (project.supervisor && project.supervisor.user) {
          project.supervisor = {
            _id: project.supervisor._id,
            firstName: project.supervisor.user.firstName,
            lastName: project.supervisor.user.lastName,
            email: project.supervisor.user.email,
          };
        } else {
          project.supervisor = null; // Explicitly set to null if no supervisor
        }

        return project;
      })
    );

    res.status(200).json(enrichedProjects);
  } catch (error) {
    next(errorHandler(500, "Error getting semester projects"));
  }
};
const projectList = async (req, res) => {};
const projectDetails = async (req, res) => {};

// get admin profile
const getAdminProfile = async (req, res, next) => {
  try {
    await connectToUserDB();
    const User = getUserModel();
    const { id } = req.params;
    const admin = await User.findById(id).select("-password");

    if (!admin) {
      return next(errorHandler(404, "Admin not found"));
    }
    res.status(200).json(admin);
  } catch (error) {
    console.error("Error in getAdminProfile:", error);
    next(errorHandler(500, "Error getting admin profile"));
  }
};

// edit admin profile
const editAdminProfile = async (req, res, next) => {
  try {
    await connectToUserDB();
    const User = getUserModel();
    const { id } = req.params;
    const updatedAdmin = await User.findByIdAndUpdate(id, req.body, {
      new: true,
    }).select("-password");
    if (!updatedAdmin) {
      return next(errorHandler(404, "Admin not found"));
    }
    res.status(200).json(updatedAdmin);
  } catch (error) {
    console.error("Error in editAdminProfile:", error);
    next(errorHandler(500, "Error updating admin profile"));
  }
};

module.exports = {
  addSupervisor,
  allSupervisors,
  updateSupervisor,
  deleteSupervisor,
  getStudentDetails,
  allStudents,
  getStudentsByStatus,
  updateStudentStatus,
  deleteStudent,
  adminSemesterProjects,
  projectList,
  projectDetails,
  getAdminProfile,
  editAdminProfile,
};
