const { connectToUserDB, getSupervisorModel } = require("../config/userDB");
const errorHandler = require("../utils/errors");

const getSupervisorProfile = async (req, res,next) => {
    try{
        await connectToUserDB();
        const Supervisor = getSupervisorModel();
        const { id } = req.params;
        const supervisor = await Supervisor.findOne({ user: id }).populate('user', '-password');
        if (!supervisor) {
            return res.status(404).json({ message: 'Supervisor not found' });
        }
        res.status(200).json({
            ...supervisor.toObject(),
            ...supervisor.user.toObject(),
            department: 'Department of Information Technology & Management (ITM)',
            faculty: 'Faculty of Science and Information Technology'
        });
    }catch(error){
        next(errorHandler(500, "Error getting supervisor profile"));
    }
};

const editSupervisorProfile = async (req, res,next) => {
    try{
        await connectToUserDB();
        const Supervisor = getSupervisorModel();
        const { id } = req.params;
        const supervisor = await Supervisor.findOne({ user: id });
        if (!supervisor) {
            return res.status(404).json({ message: 'Supervisor not found' });
        }
        const { firstName, lastName, email } = req.body;
        await User.findByIdAndUpdate(supervisor.user, { firstName, lastName, email });
        await supervisor.save();
        const updatedSupervisor = await Supervisor.findOne({ user: id }).populate('user', '-password');
        res.status(200).json({
            ...updatedSupervisor.toObject(),
            ...updatedSupervisor.user.toObject(),
            department: 'Department of Information Technology & Management (ITM)',
            faculty: 'Faculty of Science and Information Technology'
        });
    }catch(error){
        next(errorHandler(500, "Error updating supervisor profile"));
    }
};

module.exports = {
    getSupervisorProfile,
    editSupervisorProfile
}