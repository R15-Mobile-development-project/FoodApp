const db = require("../config/db");
const bcrypt = require("bcrypt");

const orders = {
  // Define a function to get orders for a specific user
  getOrders: function (id, cb) {
    // Query the database to select all orders related to the given user ID
    // and join with the restaurants table to include the restaurant name
    return db.query(
      "SELECT o.*, m.name AS item_name, m.price AS item_price, r.name AS restaurant_name FROM orders o JOIN order_menus om ON om.order_id = o.order_id JOIN menus m ON m.menu_id = om.menu_id JOIN restaurants r ON r.restaurant_id = m.restaurant_id WHERE o.user_id = ?",
      [id],
      cb
    );
  },
};

// Export the orders module
module.exports = orders;
