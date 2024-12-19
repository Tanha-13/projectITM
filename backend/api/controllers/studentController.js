const {
  connectToUserDB,
  getUserModel,
  getStudentModel,
} = require("../config/userDB");
const bcrypt = require("bcryptjs");
const errorHandler = require("../utils/errors");

const getStudentProfile = async (req, res, next) => {
  try {
    const { id } = req.params;
    console.log(id);
    await connectToUserDB();
    const Student = getStudentModel();
    const student = await Student.findOne({ user: id })
      .populate("user", "-password")
      .populate({
        path: "supervisor",
        populate: { path: "user" },
      });
    console.log(student);

    if (!student) {
      return res.status(404).json({ message: "Student not found" });
    }
    res.status(200).json({
      ...student.toObject(),
      ...student.user.toObject(),
      department: "Department of Information Technology & Management (ITM)",
      faculty: "Faculty of Science and Information Technology",
      supervisor: `${student.supervisor.user.firstName} ${student.supervisor.user.lastName}`,
    });
  } catch (error) {
    next(errorHandler(500, "Error getting student profile"));
  }
};
const editStudentProfile = async (req, res, next) => {
  try {
    await connectToUserDB();
    const Student = getStudentModel();
    const { id } = req.params;
    const student = await Student.findOne({ user: id });
    if (!student) {
      return res.status(404).json({ message: "Student not found" });
    }
    await User.findByIdAndUpdate(student.user, { firstName, lastName, email });
    student.semester = semester;
    student.batch = batch;
    await student.save();
    const updatedStudent = await Student.findOne({ user: id })
      .populate("user", "-password")
      .populate("supervisor");
    res.status(200).json({
      ...updatedStudent.toObject(),
      ...updatedStudent.user.toObject(),
      department: "Department of Information Technology & Management (ITM)",
      faculty: "Faculty of Science and Information Technology",
      supervisor: `${updatedStudent.supervisor.user.firstName} ${updatedStudent.supervisor.user.lastName}`,
    });
  } catch (error) {
    next(errorHandler(500, "Error updating student profile"));
  }
};

module.exports = {
  getStudentProfile,
  editStudentProfile,
};
