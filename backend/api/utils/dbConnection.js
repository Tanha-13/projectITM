const mongoose = require("mongoose");

const connections = {};

const clientOptions = {
  serverApi: { version: "1", strict: true, deprecationErrors: true },
};

const connectToDatabase = async ({ uri, dbName }) => {
  if (connections[dbName]) {
    console.log(`Reusing ${dbName} database`);
    return connections[dbName];
  }
  try {
    const connection = await mongoose.createConnection(uri, clientOptions);

    // native mongodb client to execute the ping command
    const ping = await connection.getClient().db().command({ ping: 1 });
    if (ping.ok === 1) {
      console.log(`Connected to ${dbName} database`);
    }

    //
    connection.on("connected", () => {
      console.log(`Connection established for ${dbName} database`);
    });
    connection.on("error", (err) => {
      console.error(`${err}`);
    });
    connections[dbName] = connection;
    return connection;
  } catch (err) {
    console.log(`${err}`);
    throw err;
  }
};

const disconnectFromDatabase = async (dbName) => {
  if (!connections[dbName]) {
    console.log(`No active ${dbName} database`);
    return;
  }
  try {
    await connections[dbName].close();
    delete connections[dbName];
    console.log(`Disconnected from ${dbName} database`);
  } catch (err) {
    console.log(`${err}`);
    throw err;
  }
};

module.exports = {
  connectToDatabase,
  disconnectFromDatabase,
};
