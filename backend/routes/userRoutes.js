var express = require('express');
var router = express.Router();
const db = require("../config/db");
const userController = require("../controllers/userController");
const jwt = require("../config/jwt");

router.post('/login', userController.userLogin);
router.post('/register', userController.userRegister);

module.exports = router;