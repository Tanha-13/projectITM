const express = require("express");
const cors = require("cors");
const { connectToUserDB } = require("./api/config/userDB");
const { connectToProjectDB } = require("./api/config/projectDB");
const seedAdmin = require("./api/seeds/seedAdmin");
const path = require("path");

const app = express();

// middleware
app.use(cors());
app.use(express.json());


// const _dirname = path.resolve();

app.use('/uploads', express.static(path.join(__dirname,'api','uploads')));


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

  //routing
  // auth routing
  const authRoutes = require('./api/routes/auth');
  app.use("/api/auth",authRoutes);

  // admin routing
  const adminRoutes = require("./api/routes/adminRoute");
  app.use("/api/admin",adminRoutes);
  //supervisor routing
  const supervisorRoutes = require("./api/routes/supervisor");
  app.use("/api/supervisor",supervisorRoutes);
  //student routing
  const studentRoutes = require("./api/routes/student");
  app.use("/api/student",studentRoutes);
  //project routing
  const projectRoutes = require("./api/routes/project");
  app.use("/api/projects",projectRoutes);


  
  // app.use(express.static(path.join(_dirname, "./frontend/dist")));
  // app.get('*',(req,res)=>{
  //   res.sendFile(path.resolve(_dirname,"frontend","dist", "index.html"));
  // });

  

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

  // server
  const port = process.env.PORT || 5000;
  app.listen(port, () => {
    console.log(`Server is running on ${port}`);
  });
});


//closing the database
// process.on('SIGINT', async() => {
//     try{
//         await disconnectFromUserDB();
//         await disconnectFromProjectDB();
//         console.log('Closed successfully');
//         process.exit(0);
//     }catch(err){
//         console.log(`${err}`);
//         process.exit(1);
//     }
// })
