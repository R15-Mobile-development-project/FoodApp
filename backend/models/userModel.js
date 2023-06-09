const db = require("../config/db");
const bcrypt = require("bcrypt");

const user = {
  // Function to get all users
  get: function (callback) {
    return db.query("select * from users", callback);
  },

  // Function to get a user by their ID
  getById: function (id, callback) {
    return db.query("select * from users where user_id=?", [id], callback);
  },

  // Function to get a user by their email
  getByEmail: function (email, callback) {
    return db.query("select * from users where email = ?", [email], callback);
  },

  // Function to get user credentials by email and password
  getCredentials: function (email, password, callback) {
    return db.query(
      "select * from users where email=? and password=?",
      [email, password],
      callback
    );
  },

  // Function to add a new user
  add: function (fname, lname, email, password, user_type = 0, callback) {
    return db.query(
      "insert into users (fname, lname, email, password, user_type) values(?, ?, ?, ?, ?)",
      [fname, lname, email, password, user_type],
      callback
    );
  },

  // Function to update a user by their ID
  updateUserById: function (data, cb) {
    return db.query(
      "UPDATE users SET email = COALESCE(NULLIF(?, ''), email), fname = COALESCE(NULLIF(?, ''), fname), lname = COALESCE(NULLIF(?, ''), lname), password = COALESCE(NULLIF(?, ''), password) WHERE user_id = ?",
      [data.email, data.fname, data.lname, data.password, data.userId],
      cb
    );
  },

  // Function to update a user's balance by their ID
  updateBalance: function (data, cb) {
    return db.query(
      "UPDATE users SET balance=? WHERE user_id=?",
      [data.balance, data.userId],
      cb
    );
  },

  // Function to delete a user by their ID
  deleteById: function (id, cb) {
    return db.query("DELETE FROM users WHERE user_id = ?", [id], cb);
  },
};

module.exports = user;
