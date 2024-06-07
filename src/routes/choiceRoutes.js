const express = require('express');
const router = express.Router();
const authenticateToken = require('../middlewares/auth');
const choiceController = require('../controllers/choiceController');

router.post('/', authenticateToken, choiceController.createChoice);

router.get('/', authenticateToken, choiceController.getAllChoices);

router.get('/:id', authenticateToken, choiceController.getChoiceById);

router.put('/:id', authenticateToken, choiceController.updateChoiceById);

router.delete('/:id', authenticateToken, choiceController.deleteChoiceById);

module.exports = router;
