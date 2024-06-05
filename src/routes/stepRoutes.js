const express = require('express');
const router = express.Router();
const stepController = require('../controllers/stepController');

router.post('/', stepController.createStep);

router.get('/', stepController.getAllSteps);

router.get('/:id', stepController.getStepById);

router.put('/:id', stepController.updateStepById);

router.delete('/:id', stepController.deleteStepById);

module.exports = router;
