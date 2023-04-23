const user = require("../models/userModel");
const bcrypt = require("bcrypt");
const emailvalidator = require("email-validator");
const jwt = require("../config/jwt");
require("dotenv").config();

// Function for handling user login
const userLogin = (req, res) => {
  // Extract email and password from request body
  const { email, password } = req.body;

  // Validate email and password
  if (!emailvalidator.validate(email) || !password) {
    return res.status(401).json({ message: "Invalid credentials" });
  }

  // Get user data by email
  user.getByEmail(email, (err, results) => {
    // Handle errors during query
    if (err) {
      return res.status(500).json({
        message: "Error occured",
      });
    }
    // If user found, check the password
    if (results.length > 0) {
      bcrypt.compare(
        password,
        results[0].password.toString(),
        (err, result) => {
          // Handle errors during password comparison
          if (err) {
            return res.status(500).json({
              message: "Error occured",
            });
          }
          // If password matches, generate token and send it in response
          if (result) {
            const token = jwt.generateToken(
              results[0].user_id,
              results[0].user_type
            );
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

// Function for handling user registration
const userRegister = (req, res) => {
  // Extract user details from request body
  const { fname, lname, email, password, user_type } = req.body;

  // Validate user input
  if (!fname || !lname || !email || !password) {
    return res.status(400).json({ message: "Please fill in all fields" });
  } else if (!emailvalidator.validate(email)) {
    return res.status(400).json({ message: "Invalid email" });
  } else if (password.length < 1) {
    return res.status(400).json({ message: "Password too short" });
  }

  // Check if user_type is valid
  if (user_type) {
    if (user_type !== 0 && user_type !== 1) {
      return res.status(400).json({ message: "Invalid user type" });
    }
  }

  // Hash the password
  bcrypt.hash(password, 10, function (err, hash) {
    // Handle errors during hashing
    if (err) {
      return res.status(500).json({
        message: "Error occured",
      });
    }
    // Add user to the database
    user.add(fname, lname, email, hash, user_type, (err, results) => {
      // Handle errors during user addition
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
      // Send success message on successful registration
      return res.status(200).json({
        message: "Registration successful",
      });
    });
  });
};

// Function for getting user profile data
const userProfile = (req, res) => {
  // Get user data by user id
  user.getById(req.userId, (err, results) => {
    // Handle errors during query
    if (err) {
      return res.status(500).json({
        message: "Error occured",
      });
    }

    // If no user data found, return an error
    if (results.length === 0) {
      return res.status(400).json({
        message: "No user data was found for that user id",
      });
    }

    // Remove sensitive data before sending the response
    delete results[0].user_id;
    delete results[0].password;

    // Send user profile data in the response
    res.json(results[0]);
  });
};

// Function for deleting user profile
const deleteProfile = (req, res) => {
  // Delete user data by user id
  user.deleteById(req.userId, (err, results) => {
    // Handle errors during deletion
    if (err) {
      console.log(err);
      return res.status(500).json({
        message: "Error occured",
      });
    }

    // If user deleted successfully, send a success message
    if (results.affectedRows === 1) {
      return res.json({ message: "User deleted" });
    } else {
      // If unable to delete user, send an error message
      res.status(400).json({
        message: "Unable to delete user",
      });
    }
  });
};

// Function for updating user profile
const updateUserProfile = async (req, res) => {
  // Extract user details from request body
  const { fname, lname, email, password } = req.body;

  // Validate email and password
  if (email && !emailvalidator.validate(email)) {
    return res.status(400).json({ message: "Invalid email" });
  } else if (password && password.length < 1) {
    return res.status(400).json({ message: "Password too short" });
  }

  // If a new password is provided, hash it
  let hashedPassword;
  if (password) {
    try {
      hashedPassword = await bcrypt.hash(password, 10);
    } catch (error) {
      return res.status(500);
    }
  }

  // Prepare data for updating user profile
  const data = {
    email: email,
    fname: fname,
    lname: lname,
    password: hashedPassword,
    userId: req.userId,
  };

  // Update user data by user id
  user.updateUserById(data, (err, results) => {
    // Handle errors during update
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

    // Send appropriate response based on the update result
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
  // Extract balance value from the request body
  const { balance } = req.body;

  // Check if the balance value is a number
  if (typeof balance != "number") {
    // If not, respond with a 400 status code and error message
    return res.status(400).json({ message: "Not a number" });
  }

  // Prepare the data object to be passed to the user model
  const data = {
    balance: balance,
    userId: req.userId,
  };

  // Function to update a user's balance
  user.updateBalance(data, (err, results) => {
    if (err) {
      console.log(err);
      return res.status(500).json({
        message: "Error occured",
      });
    }

    // If one row has been changed, the balance was successfully updated
    if (results.changedRows === 1) {
      return res.json({ message: "Balance updated" });
    }
    // If no rows were changed but one row was affected, the balance was already up-to-date
    else if (results.changedRows === 0 && results.affectedRows === 1) {
      return res.json({ message: "Everything up to date" });
    }
    // In any other case, respond with a 400 status code and an error message
    else {
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
