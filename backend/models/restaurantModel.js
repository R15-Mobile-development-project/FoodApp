const db = require("../config/db");

const restaurant = {
  // Function to add a new restaurant
  addRestaurant: function (data, callback) {
    const queryString = `INSERT INTO restaurants SET ?`;
    db.query(queryString, data, callback);
  },

  // Function to add new menus to a restaurant
  addMenus: function (data, callback) {
    const menuQueryString = `INSERT INTO menus (name, price, restaurant_id) VALUES ?`;
    db.query(menuQueryString, [data], callback);
  },

  // Function to get a restaurant by the user ID
  getRestaurantByUserId: function (user_id, callback) {
    const queryString = `
      SELECT r.*, m.menu_id, m.name as menu_name, m.price as menu_price
      FROM restaurants r
      LEFT JOIN menus m ON r.restaurant_id = m.restaurant_id
      WHERE r.user_id = ?;
    `;
    db.query(queryString, [user_id], callback);
  },

  // Function to get a restaurant ID by the user ID
  getRestaurantIdByUserId: function (user_id, callback) {
    const queryString =
      "SELECT restaurant_id FROM restaurants WHERE user_id = ?";
    db.query(queryString, [user_id], callback);
  },

  // Function to update a restaurant's information
  updateRestaurant: function (id, data, callback) {
    const queryString = `
      UPDATE restaurants
      SET ?
      WHERE restaurant_id = ?;
    `;
    db.query(queryString, [data, id], callback);
  },

  // Function to delete menus by restaurant ID
  deleteMenus: function (restaurant_id, callback) {
    const queryString = `DELETE FROM menus WHERE restaurant_id = ?`;
    db.query(queryString, [restaurant_id], callback);
  },

  // Function to get a restaurant by its ID
  get: function (id, callback) {
    db.query("SELECT * FROM restaurants WHERE user_id = ?", [id], callback);
  },

  // Function to get all restaurants
  getAll: function (callback) {
    db.query("SELECT * FROM restaurants", callback);
  },

  // Function to delete a restaurant by its ID
  deleteRestaurant: function (restaurant_id, callback) {
    const queryString = `DELETE FROM restaurants WHERE restaurant_id = ?`;
    db.query(queryString, [restaurant_id], callback);
  },

  // Function to count the number of restaurants for a specific user
  restaurantCount: function (user_id, callback) {
    const queryString = `SELECT COUNT(*) as count FROM restaurants WHERE user_id = ?`;
    db.query(queryString, [user_id], callback);
  },

  // Function to get restaurants for pagination (with a limit and offset)
  getByPage: function (offset, callback) {
    db.query("SELECT * FROM restaurants LIMIT 6 OFFSET ?", [offset], callback);
  },

  getOrders: function (user_id, callback) {
    db.query(
      "select o.* from restaurants r join orders o on o.restaurant_id = r.restaurant_id where r.user_id = ?",
      [user_id],
      callback
    );
  },

  restaurantMenu: function (restaurant_id, callback) {
    const queryString = `SELECT * FROM menus WHERE restaurant_id = ?`;
    db.query(queryString, [restaurant_id], callback);
  },

  getByPage: function (offset, callback) {
    db.query("SELECT * FROM restaurants LIMIT 6 OFFSET ?", [offset], callback);
  },

  addOrder: function (user_id, restaurant_id, price, callback) {
    const queryString = `INSERT INTO orders (user_id, restaurant_id, price) VALUES (?, ?, ?)`;
    db.query(queryString, [user_id, restaurant_id, price], callback);
  },

  addOrderMenus: function (data, callback) {
    const queryString = `INSERT INTO order_menus (order_id, menu_id) VALUES ?`;
    db.query(queryString, [data], callback);
  },
};

module.exports = restaurant;
