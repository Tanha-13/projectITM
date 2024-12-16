const express = require("express");
const cors = require("cors");
const { connectToUserDB, disconnectFromUserDB } = require("./api/config/userDB");
const { connectToProjectDB, disconnectFromProjectDB } = require("./api/config/projectDB");
const seedAdmin = require("./api/seeds/seedAdmin");

const app = express();

// middleware
app.use(cors());
app.use(express.json());

//database connection
const databaseConnection = async () => {
  try {
    await connectToUserDB();
    await connectToProjectDB();
    console.log("All databases connected");
    await seedAdmin();
    console.log("Admin seeding completed.");
  } catch (err) {
    console.log(`${err}`);
    process.exit(1);
  }
};
databaseConnection().then(() => {


  // error handling middleware
  app.use((err,req,res,next) => {
    const statusCode = err.statusCode || 500;
    const message = err.message || "Internal Server Error";
    return res.status(statusCode).json({
      success: false,
      message,
      statusCode
    })

  });

  //routing
  // auth routing
  const authRoutes = require('./api/routes/auth');
  app.use("/api/auth",authRoutes);
  // server
  const port = process.env.PORT || 5000;
  app.listen(port, () => {
    console.log(`Server is running on ${port}`);
  });
});


//closing the database
process.on('SIGINT', async() => {
    try{
        await disconnectFromUserDB();
        await disconnectFromProjectDB();
        console.log('Closed successfully');
        process.exit(0);
    }catch(err){
        console.log(`${err}`);
        process.exit(1);
    }
})
