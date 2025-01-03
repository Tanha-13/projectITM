const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
require("dotenv").config();
const {connectToUserDB, getUserModel} = require("../config/userDB");

const seedAdmin = async() => {
    await connectToUserDB();
    const User = getUserModel();
    try{
        const existingAdmin = await User.findOne({role:'admin'});
        if(existingAdmin){
            console.log("Admin already exists");
            return;
        }

        const hashedPassword = bcrypt.hashSync(process.env.ADMIN_PASSWORD, 12);
        const admin = new User({
            firstName: "Nusrat",
            lastName:'Zaman',
            email:process.env.ADMIN_EMAIL,
            password: hashedPassword,
            gender:'female',
            role:'admin'
        });
        await admin.save();
        console.log("Admin user created successfully");
    }catch(error){
        console.log(`${error}`);
    }
}

module.exports = seedAdmin
