const user = require("../models/userModel");
const bcrypt = require("bcrypt");
const emailvalidator = require("email-validator");
const jwt = require("../config/jwt");
require("dotenv").config();

const userLogin = (req, res) => {
  const email = req.body.email;
  const password = req.body.password;
  if (emailvalidator.validate(email)) {
    user.getByEmail(email, (err, results) => {
      if (err) {
        res.status(500).json({
          message: "Error occured",
          error: err,
        });
      } else {
        if (results.length > 0) {
          bcrypt.compare(
            password,
            results[0].password.toString(),
            (err, result) => {
              if (err) {
                console.log(results[0].password);
                res.status(500).json({
                  message: "Error occured",
                  error: err,
                });
              } else {
                if (result) {
                  const token = jwt.generateToken(results[0].user_id);
                  console.log("Created token: " + token);
                  res.status(200).json({
                    message: "Login successful",
                    token: token,
                  });
                } else {
                  res.status(401).json({
                    message: "Invalid credentials",
                  });
                }
              }
            }
          );
        } else {
          res.status(401).json({
            message: "Invalid credentials",
          });
        }
      }
    });
  } else {
    res.status(400).json({
      message: "Invalid email",
    });
  }
};

const userRegister = (req, res) => {
  if (emailvalidator.validate(req.body.email)) {
    user.add(req, (err, results) => {
      if (err.errno === 1062) {
        res.status(400).json({
          message: "Email already registered",
        });
        return;
      }
      if (err) {
        res.status(500).json({
          message: "Error occured",
          error: err,
        });
      } else {
        res.status(200).json({
          message: "Registration successful",
        });
      }
    });
  } else {
    res.status(400).json({
      message: "Invalid email",
    });
  }
};

module.exports = {
  userLogin,
  userRegister,
};
