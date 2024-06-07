const express = require('express');
const userController = require('../controllers/userController');
const authenticateToken = require('../middlewares/auth');
const router = express.Router();

router.post('/', userController.createUser);

router.get('/', authenticateToken, userController.getAllUsers);

router.get('/:id', authenticateToken, userController.getUserById);

router.put('/:id', authenticateToken, userController.updateUser);

router.delete('/:id', authenticateToken, userController.deleteUser);

module.exports = router;
