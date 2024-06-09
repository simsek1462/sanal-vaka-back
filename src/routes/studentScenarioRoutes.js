const express = require('express');
const router = express.Router();
const studentScenarioController = require('../controllers/studentScenarioController');
const authenticateToken = require('../middlewares/auth');


router.get('/', authenticateToken, studentScenarioController.getAllStudentScenarios);

router.get('/:id', authenticateToken, studentScenarioController.getStudentScenarioById);

router.post('/', authenticateToken, studentScenarioController.createOrUpdateStudentScenario);

router.post('/get-all-scenario-student',authenticateToken,studentScenarioController.createOrFetchStudentScenarios);

router.put('/:id', authenticateToken, studentScenarioController.updateStudentScenario);

router.delete('/:id', authenticateToken, studentScenarioController.deleteStudentScenario);

module.exports = router;
