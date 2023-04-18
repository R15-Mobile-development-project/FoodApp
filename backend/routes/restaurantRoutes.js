const jwt = require("../config/jwt");
const express = require("express");
const router = express.Router();
const restaurantController = require("../controllers/restaurantController");

router.post("/add", jwt.verifyToken, restaurantController.restaurantAdd);
router.get("/", jwt.verifyToken, restaurantController.restaurantList);
router.get("/:page", jwt.verifyToken, restaurantController.restaurantByPage);
router.get("/me", jwt.verifyToken, restaurantController.restaurantGetByUserId);
router.put("/update", jwt.verifyToken, restaurantController.restaurantUpdate);
router.delete(
  "/delete",
  jwt.verifyToken,
  restaurantController.restaurantDelete
);
router.get(
  "/count",
  jwt.verifyToken,
  restaurantController.restaurantCountByUserId
);

module.exports = router;
