// Require the 'orderModel' module, which exports functions for interacting with order data.
const order = require("../models/orderModel");
// Require the 'bcrypt' package, which is used for hashing passwords.
const bcrypt = require("bcrypt");
// Require the 'jwt' module, which exports functions for handling JSON Web Tokens.
const jwt = require("../config/jwt");
// Require the 'dotenv' package to access environment variables.
require("dotenv").config();

// Handler function for retrieving a user's orders.
const getOrders = (req, res) => {
  // Call the 'getOrders' function from the 'orderModel' module, passing in the user ID stored in the request object.
  order.getOrders(req.userId, (err, results) => {
    if (err) {
      // If an error occurred, return a 500 Internal Server Error status with an error message.
      return res.status(500).json({
        message: "Error occurred",
      });
    }
    if (results.length === 0) {
      // If no orders were found for the user, return a 400 Bad Request status with a message.
      return res.status(400).json({
        message: "No order data was found for that user",
      });
    }
    // If orders were found, log them to the console for debugging purposes and send them as a JSON response.
    console.log(results);
    res.json(results);
  });
};

// Export the 'getOrders' function for use in other modules.
module.exports = {
  getOrders,
};
