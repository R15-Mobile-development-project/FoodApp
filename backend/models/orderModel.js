const db = require("../config/db");
const bcrypt = require("bcrypt");

const orders = {
  // Define a function to get orders for a specific user
  getOrders: function (id, cb) {
    // Query the database to select all orders related to the given user ID
    // and join with the restaurants table to include the restaurant name
    return db.query(
      "select orders.*, restaurants.name as restaurant_name from orders join restaurants on restaurants.restaurant_id = orders.restaurant_id where orders.user_id = ?;",
      [id],
      cb
    );
  },
};

// Export the orders module
module.exports = orders;
