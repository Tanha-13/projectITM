const express = require("express");
const cors = require("cors");
const { connectToUserDB, disconnectFromUserDB } = require("./api/config/userDB");
const { connectToProjectDB, disconnectFromProjectDB } = require("./api/config/projectDB");

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
  } catch (err) {
    console.log(`${err}`);
    process.exit(1);
  }
};
databaseConnection().then(() => {


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
