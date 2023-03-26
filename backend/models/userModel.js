const db = require("../config/db");
const bcrypt = require("bcrypt");

const user = {
  get: function (callback) {
    return db.query("select * from users", callback);
  },
  getById: function (id, callback) {
    return db.query("select * from users where user_id=?", [id], callback);
  },
  getByEmail: function (email, callback) {
    return db.query("select * from users where email = ?", [email], callback);
  },
  getCredentials: function (email, password, callback) {
    return db.query(
      "select * from users where email=? and password=?",
      [email, password],
      callback
    );
  },
  add: function (fname, lname, email, password, user_type = 0, callback) {
    return db.query(
      "insert into users (fname, lname, email, password, user_type) values(?, ?, ?, ?, ?)",
      [fname, lname, email, password, user_type],
      callback
    );
  },
  updateUserById: function (data, cb) {
    return db.query("UPDATE users SET email = COALESCE(NULLIF(?, ''), email), fname = COALESCE(NULLIF(?, ''), fname), lname = COALESCE(NULLIF(?, ''), lname), password = COALESCE(NULLIF(?, ''), password) WHERE user_id = ?", [data.email, data.fname, data.lname, data.password, data.userId], cb)
  }
};

module.exports = user;
