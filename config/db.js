const db = require("../models");

async function connectDB() {
  try {
    await db.sequelize.authenticate();
    console.log("Database connection has been established successfully.");


    await db.sequelize.sync(); // This will create the tables if they don't exist
    console.log("Database synchronized successfully.");
  } catch (error) {
    console.error("Unable to connect to the database:", error);
    process.exit(1); // Exit the process with an error code
  } 
}

module.exports = connectDB;
