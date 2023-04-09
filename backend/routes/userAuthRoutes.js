const express = require("express");
const router = express.Router();
const userController = require("../controllers/userController");
const restaurantController = require("../controllers/restaurantController");

router.get("/", userController.userProfile);
router.put("/", userController.updateUserProfile);
router.put("/balance", userController.updateBalance);
router.delete("/", userController.deleteProfile);
router.post("/addr", restaurantController.restaurantAdd);

module.exports = router;
