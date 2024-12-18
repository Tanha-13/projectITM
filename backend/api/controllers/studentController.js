const { connectToUserDB, getUserModel, getStudentModel } = require("../config/userDB");
const bcrypt = require("bcryptjs");
const errorHandler = require("../utils/errors");

const register = async(req,res,next) => {
    try{
        await connectToUserDB();
        const User = getUserModel();
        const Student = getStudentModel();
        console.log((req.body));
        const {firstName, lastName, email, studentId, gender, semester, batch, registeredForProject, proposalAccepted, supervisor, password} = req.body;

        const existingUser = await User.findOne({ email });
        console.log(existingUser);
        if (existingUser) {
          return res.status(400).json({ message: "User already exists" });
        }
        const hashedPassword = bcrypt.hashSync(password,15);
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
        res.status(200).json('message: Data received successfully');

    }catch(err){
        console.log(err);
        next(errorHandler(500,"registration unsuccessful"));
    }

};

module.exports = {
    register
}