const express = require('express');
const router = express.Router();
const userController = require("../controllers/userController");

router.get('/', userController.userProfile);
router.put('/', userController.updateUserProfile);
router.delete('/', userController.deleteProfile);

module.exports = router;