const express = require('express');
const router = express.Router();
const authenticateToken = require('../middlewares/auth');
const scenarioController = require('../controllers/scenarioController');


router.post('/scenario', authenticateToken, scenarioController.createScenario);

router.get('/scenario', authenticateToken, scenarioController.getScenarios);

router.get('/scenario/:id', authenticateToken, scenarioController.getScenarioById);

router.get('/scenario/get-by-clinic/:clinicId',authenticateToken,scenarioController.getScenariosByClinicId);

router.post('/scenario/check-answer',authenticateToken,scenarioController.checkAnswer);

router.put('/scenario/:id', authenticateToken, scenarioController.updateScenario);

router.delete('/scenario/:id', authenticateToken, scenarioController.deleteScenario);

module.exports = router;
