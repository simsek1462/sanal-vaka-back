const express = require('express');
const router = express.Router();
const authenticateToken = require('../middlewares/auth');
const questionController = require('../controllers/questionController');

router.post('/', authenticateToken,questionController.createQuestion);

router.get('/', authenticateToken,questionController.getAllQuestions);

router.get('/:id',authenticateToken, questionController.getQuestionById);

router.put('/:id',authenticateToken, questionController.updateQuestionById);

router.delete('/:id', authenticateToken, questionController.deleteQuestionById);

module.exports = router;
