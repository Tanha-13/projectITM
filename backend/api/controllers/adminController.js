const { getUserModel, getSupervisorModel, connectToUserDB } = require("../config/userDB");
const nodemailer = require('nodemailer');
const bcrypt = require("bcryptjs");
const errorHandler = require("../utils/errors");

const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: process.env.USER_EMAIL,
    pass: process.env.USER_PASSWORD
  },
});

const addSupervisor = async (req, res, next) => {
  try {
    await connectToUserDB();
    const User = getUserModel();
    const Supervisor = getSupervisorModel();
    console.log("Request body:", req.body);
    const { firstName, lastName, email, designation, gender, tempPassword } = req.body;
    
    // Check if user already exists
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ message: 'User with this email already exists' });
    }

    const hashedPassword = await bcrypt.hash(tempPassword, 12);
    
    // Create new user
    const newUser = new User({
      firstName,
      lastName,
      email,
      gender,
      password: hashedPassword,
      role: 'supervisor',
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
        subject: 'Your Supervisor Account',
        text: `Hello ${firstName} ${lastName},\n\nYour supervisor account has been created for ProjectITM. Here are your credentials:\nYour email: ${email}\nYour Temporary Password: ${tempPassword}\n\nPlease change your password upon first login.\n\nThank you`
      });
    } catch (emailError) {
      console.error("Error sending email:", emailError);
      // The supervisor is still created, we just couldn't send the email
    }

    res.status(201).json({ message: 'Supervisor added successfully. Email might not have been sent.', supervisor: newSupervisor });
  } catch (error) {
    console.error("Error in addSupervisor:", error);
    res.status(500).json({ message: 'Error adding supervisor', error: error.message });
  }
};

const allSupervisors = async (req, res, next) => {
  try {
    await connectToUserDB();
    const User = getUserModel();
    const Supervisor = getSupervisorModel();
    const supervisors = await Supervisor.find().populate('user');
    res.status(200).json(supervisors);
  } catch (error) {
    console.error("Error in allSupervisors:", error);
    next(errorHandler(400,"Failed to load all supervisors data"));
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
      return res.status(404).json({ message: 'Supervisor not found' });
    }

    // Update user data
    await User.findByIdAndUpdate(supervisor.user, {
      firstName: updateData.user.firstName,
      lastName: updateData.user.lastName,
      email: updateData.user.email,
    });

    // Update supervisor data
    const updatedSupervisor = await Supervisor.findByIdAndUpdate(id, {
      designation: updateData.designation,
    }, { new: true }).populate('user');

    res.status(200).json(updatedSupervisor);
  } catch (error) {
    console.error("Error in updateSupervisor:", error);
    res.status(500).json({ message: 'Error updating supervisor', error: error.message });
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
      return res.status(404).json({ message: 'Supervisor not found' });
    }

    // Delete supervisor
    await Supervisor.findByIdAndDelete(id);

    // Delete associated user
    await User.findByIdAndDelete(supervisor.user);

    res.status(200).json({ message: 'Supervisor deleted successfully' });
  } catch (error) {
    console.error("Error in deleteSupervisor:", error);
    res.status(500).json({ message: 'Error deleting supervisor', error: error.message });
  }
};

module.exports = {
  addSupervisor,
  allSupervisors,
  updateSupervisor,
  deleteSupervisor,
};

