const jwt = require("jsonwebtoken");
require("dotenv").config();

function generateToken(user) {
  return jwt.sign({ userId: user }, process.env.SECRET_TOKEN.toString(), {
    expiresIn: "1800s",
  });
}

function verifyToken(req, res, next) {
  const authHeader = req.headers["authorization"];
  const token = authHeader && authHeader.split(" ")[1];
  if (token == null) return res.sendStatus(401);

  jwt.verify(token, process.env.SECRET_TOKEN, (err, decodedToken) => {
    if (err) {
      console.log(err.message);
      return res.sendStatus(403);
    }
    req.userId = decodedToken.userId;
    next();
  });
}

module.exports = {
  generateToken,
  verifyToken,
};
