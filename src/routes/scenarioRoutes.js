const express = require('express');
const router = express.Router();
const scenarioController = require('../controllers/scenarioController');


router.post('/scenarios', scenarioController.createScenario);

router.get('/scenarios', scenarioController.getScenarios);

router.get('/scenarios/:id', scenarioController.getScenarioById);

router.put('/scenarios/:id', scenarioController.updateScenario);

router.delete('/scenarios/:id', scenarioController.deleteScenario);

module.exports = router;
