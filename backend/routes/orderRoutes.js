const express = require('express');
const router = express.Router();
const orderController = require("../controllers/orderController");
const jwt = require("../config/jwt");

router.get('/', jwt.verifyToken, orderController.getOrders);

module.exports = router;