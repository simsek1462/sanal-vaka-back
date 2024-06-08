const express = require('express');
const router = express.Router();
const authenticateToken = require('../middlewares/auth');
const stepController = require('../controllers/stepController');

router.post('/', authenticateToken,stepController.createStep);

router.get('/', authenticateToken,stepController.getAllSteps);

router.get('/:id', authenticateToken,stepController.getStepById);

router.get('/get-heads/:id',authenticateToken,stepController.getHeadsByStepId);

router.get('/get-questions/:id',authenticateToken,stepController.getQuestionsByStepId);


router.put('/:id', authenticateToken,stepController.updateStepById);

router.delete('/:id', authenticateToken,stepController.deleteStepById);

module.exports = router;
