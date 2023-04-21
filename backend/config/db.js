// Require the 'mysql2' package and the 'dotenv' package to access environment variables.
var mysql = require("mysql2");
require("dotenv").config();

// Create a connection pool to the MySQL database, using environment variables to set connection parameters.
const conn = mysql.createPool({
  host: process.env.DB_HOST.toString(), // The hostname of the database server.
  user: process.env.DB_USER.toString(), // The username for authenticating to the database.
  password: process.env.DB_PASS.toString(), // The password for authenticating to the database.
  database: process.env.DB_DB.toString(), // The name of the database to use.
  multipleStatements: "true", // Allow multiple statements to be executed in a single query.
});

// Export the connection pool for use in other modules.
module.exports = conn;
