const db = require("../config/db");

const restaurant = {
  addRestaurant: function (data, callback) {
    const queryString = `INSERT INTO restaurants SET ?`;
    db.query(queryString, data, callback);
  },

  addMenus: function (data, callback) {
    const menuQueryString = `INSERT INTO menus (name, price, restaurant_id) VALUES ?`;
    db.query(menuQueryString, [data], callback);
  },

  getRestaurantByUserId: function (user_id, callback) {
    const queryString = `
      SELECT r.*, m.menu_id, m.name as menu_name, m.price as menu_price
      FROM restaurants r
      LEFT JOIN menus m ON r.restaurant_id = m.restaurant_id
      WHERE r.user_id = ?;
    `;
    db.query(queryString, [user_id], callback);
  },

  getRestaurantIdByUserId: function (user_id, callback) {
    const queryString =
      "SELECT restaurant_id FROM restaurants WHERE user_id = ?";
    db.query(queryString, [user_id], callback);
  },

  updateRestaurant: function (id, data, callback) {
    const queryString = `
      UPDATE restaurants
      SET ?
      WHERE restaurant_id = ?;
    `;
    db.query(queryString, [data, id], callback);
  },

  deleteMenus: function (restaurant_id, callback) {
    const queryString = `DELETE FROM menus WHERE restaurant_id = ?`;
    db.query(queryString, [restaurant_id], callback);
  },

  get: function (id, callback) {
    db.query("SELECT * FROM restaurants WHERE user_id = ?", [id], callback);
  },

  getAll: function (callback) {
    db.query("SELECT * FROM restaurants", callback);
  },

  deleteRestaurant: function (restaurant_id, callback) {
    const queryString = `DELETE FROM restaurants WHERE restaurant_id = ?`;
    db.query(queryString, [restaurant_id], callback);
  },

  restaurantCount: function (user_id, callback) {
    const queryString = `SELECT COUNT(*) as count FROM restaurants WHERE user_id = ?`;
    db.query(queryString, [user_id], callback);
  },
  restaurantMenu: function (restaurant_id, callback) {
    const queryString = `SELECT * FROM menus WHERE restaurant_id = ?`;
    db.query(queryString, [restaurant_id], callback);
  },

  getByPage: function (offset, callback) {
    db.query("SELECT * FROM restaurants LIMIT 6 OFFSET ?", [offset], callback);
  },

  addOrder: function (price, restaurant_id, user_id, callback) {
    const QueryString = `INSERT INTO orders (price, restaurant_id, user_id) VALUES (?, ?, ?)`;
    db.query(QueryString, [price, restaurant_id, user_id], callback);
  },
};

module.exports = restaurant;
