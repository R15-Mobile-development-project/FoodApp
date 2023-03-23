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
  add: function (req, callback) {
    bcrypt.hash(req.body.password, 10, function (err, hash) {
      return db.query(
        "insert into users (lname, fname, email, password, user_type) values(?, ?, ?, ?, ?)",
        [
          req.body.lname,
          req.body.fname,
          req.body.email,
          hash,
          req.body.user_type,
        ],
        callback
      );
    });
  },
};

module.exports = user;
