const jwt = require("../config/jwt");
const express = require("express");
const router = express.Router();
const restaurantController = require("../controllers/restaurantController");

router.post("/add", jwt.verifyToken, restaurantController.restaurantAdd);
router.get("/", jwt.verifyToken, restaurantController.restaurantGetByUserId);
router.put("/update", jwt.verifyToken, restaurantController.restaurantUpdate);

module.exports = router;
