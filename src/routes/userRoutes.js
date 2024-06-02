const express = require('express');
const userController = require('../controllers/userController');
const authenticateToken = require('../middlewares/auth');
const router = express.Router();

router.get('/user', authenticateToken, userController.getUsers);

module.exports = router;
