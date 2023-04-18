// Require the 'jsonwebtoken' package and the 'dotenv' package to access environment variables.
const jwt = require("jsonwebtoken");
require("dotenv").config();

// Function to generate a JWT token, given a user ID and user type.
function generateToken(user_id, user_type) {
  // Use the 'sign' method of the 'jsonwebtoken' package to create a JWT token.
  return jwt.sign(
    { userId: user_id, userType: user_type }, // The payload of the token, containing user information.
    process.env.SECRET_TOKEN.toString(), // The secret key used to sign the token, read from environment variables.
    {
      expiresIn: "1800s", // The token will expire after 1800 seconds (30 minutes).
    }
  );
}

// Middleware function to verify a JWT token in a request header.
function verifyToken(req, res, next) {
  // Extract the token from the authorization header, if present.
  const authHeader = req.headers["authorization"];
  const token = authHeader && authHeader.split(" ")[1];
  // If no token is found, return a 401 Unauthorized status.
  if (token == null) return res.sendStatus(401);

  // Use the 'verify' method of the 'jsonwebtoken' package to decode and verify the token.
  jwt.verify(token, process.env.SECRET_TOKEN, (err, decodedToken) => {
    // If there is an error decoding the token, return a 403 Forbidden status.
    if (err) {
      console.log(err.message); // Log the error message for debugging purposes.
      return res.sendStatus(403);
    }
    // Store the decoded user ID in the request object for use in subsequent middleware or route handlers.
    req.userId = decodedToken.userId;
    next(); // Call the next middleware or route handler.
  });
}

// Export the 'generateToken' and 'verifyToken' functions for use in other modules.
module.exports = {
  generateToken,
  verifyToken,
};
