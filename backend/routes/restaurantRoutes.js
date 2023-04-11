const jwt = require("../config/jwt");
const express = require("express");
const router = express.Router();
const restaurantController = require("../controllers/restaurantController");

router.post("/add", jwt.verifyToken, restaurantController.restaurantAdd);
router.get("/", restaurantController.restaurantList);

module.exports = router;
