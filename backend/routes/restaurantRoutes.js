const jwt = require("../config/jwt");
const express = require("express");
const router = express.Router();
const restaurantController = require("../controllers/restaurantController");

router.post("/add", jwt.verifyToken, restaurantController.restaurantAdd);
router.get("/", restaurantController.restaurantList);
router.get("/me", jwt.verifyToken, restaurantController.restaurantGetByUserId);
router.put("/update", jwt.verifyToken, restaurantController.restaurantUpdate);

module.exports = router;
