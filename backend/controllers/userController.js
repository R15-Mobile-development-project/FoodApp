const user = require("../models/userModel");
const bcrypt = require("bcrypt");
const emailvalidator = require("email-validator");
const jwt = require("../config/jwt");
require("dotenv").config();

const userLogin = (req, res) => {
  const { email, password } = req.body;

  if (!emailvalidator.validate(email) || !password) {
    return res.status(401).json({ message: "Invalid credentials" });
  }

  user.getByEmail(email, (err, results) => {
    if (err) {
      return res.status(500).json({
        message: "Error occured",
      });
    }
    if (results.length > 0) {
      bcrypt.compare(
        password,
        results[0].password.toString(),
        (err, result) => {
          if (err) {
            return res.status(500).json({
              message: "Error occured",
            });
          }
          if (result) {
            const token = jwt.generateToken(results[0].user_id);
            return res.status(200).json({
              message: "Login successful",
              token: token,
            });
          } else {
            return res.status(401).json({
              message: "Invalid credentials",
            });
          }
        }
      );
    } else {
      return res.status(401).json({
        message: "Invalid credentials",
      });
    }
  });
};

const userRegister = (req, res) => {
  const { fname, lname, email, password, user_type } = req.body;

  if (!fname || !lname || !email || !password) {
    return res.status(400).json({ message: "Please fill in all fields" });
  } else if (!emailvalidator.validate(email)) {
    return res.status(400).json({ message: "Invalid email" });
  } else if (password.length < 1) {
    return res.status(400).json({ message: "Password too short" });
  }

  if (user_type) {
    if (user_type !== 0 && user_type !== 1) {
      return res.status(400).json({ message: "Invalid user type" });
    }
  }

  bcrypt.hash(password, 10, function (err, hash) {
    if (err) {
      return res.status(500).json({
        message: "Error occured",
      });
    }
    user.add(fname, lname, email, hash, user_type, (err, results) => {
      if (err) {
        if (err.errno === 1062) {
          return res.status(400).json({
            message: "Email already registered",
          });
        } else {
          return res.status(500).json({
            message: "Error occured",
          });
        }
      }
      return res.status(200).json({
        message: "Registration successful",
      });
    });
  });
};

const userProfile = (req, res) => {
  user.getById(req.userId, (err, results) => {
    if (err) {
      return res.status(500).json({
        message: "Error occured",
      });
    }

    if (results.length === 0) {
      return res.status(400).json({
        message: "No user data was found for that user id",
      });
    }

    delete results[0].user_id;
    delete results[0].password;

    res.json(results[0]);
  });
};

const deleteProfile = (req, res) => {
  user.deleteById(req.userId, (err, results) => {
    if (err) {
      return res.status(500).json({
        message: "Error occured",
      });
    }

    if (results.affectedRows === 1) {
      return res.json({ message: "User deleted" });
    } else {
      res.status(400).json({
        message: "Unable to delete user",
      });
    }
  });
};

const updateUserProfile = async (req, res) => {
  const { fname, lname, email, password } = req.body;

  if (email && !emailvalidator.validate(email)) {
    return res.status(400).json({ message: "Invalid email" });
  } else if (password && password.length < 1) {
    return res.status(400).json({ message: "Password too short" });
  }

  let hashedPassword;

  if (password) {
    try {
      hashedPassword = await bcrypt.hash(password, 10);
    } catch (error) {
      return res.status(500);
    }
  }

  const data = {
    email: email,
    fname: fname,
    lname: lname,
    password: hashedPassword,
    userId: req.userId,
  };

  user.updateUserById(data, (err, results) => {
    if (err) {
      if (err.errno === 1062) {
        return res.status(500).json({
          message: "Email address is already in use",
        });
      }
      return res.status(500).json({
        message: "Error occured",
      });
    }

    if (results.changedRows === 1) {
      return res.json({ message: "Profile updated" });
    } else if (results.changedRows === 0 && results.affectedRows === 1) {
      return res.json({ message: "Everything up to date" });
    } else {
      res.status(400).json({
        message: "Unable to update profile",
      });
    }
  });
};
const updateBalance = (req, res) => {
  const { balance } = req.body;

  if (typeof balance != "number") {
    return res.status(400).json({ message: "Not a number" });
  }

  const data = {
    balance: balance,
    userId: req.userId,
  };
  user.updateBalanceById(data, (err, results) => {
    if (err) {
      console.log(err);
      return res.status(500).json({
        message: "Error occured",
      });
    }

    if (results.changedRows === 1) {
      return res.json({ message: "Balance updated" });
    } else if (results.changedRows === 0 && results.affectedRows === 1) {
      return res.json({ message: "Everything up to date" });
    } else {
      res.status(400).json({
        message: "Unable to add balance",
      });
    }
  });
};

module.exports = {
  userLogin,
  userRegister,
  userProfile,
  updateUserProfile,
  updateBalance,
  deleteProfile,
};
