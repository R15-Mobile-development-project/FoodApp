const db = require("../config/db");
const bcrypt = require("bcrypt");

const orders = {
  // Define a function to get orders for a specific user
  getOrders: function (id, cb) {
    // Query the database to select all orders related to the given user ID
    // and join with the restaurants table to include the restaurant name
    return db.query(
      "select o.*, m.name from orders o join order_menus om on om.order_id = o.order_id join menus m on m.menu_id = om.menu_id where o.user_id = 1;",
      [id],
      cb
    );
  },
};

// Export the orders module
module.exports = orders;
