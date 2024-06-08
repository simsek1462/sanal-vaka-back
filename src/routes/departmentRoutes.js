const express = require('express');
const router = express.Router();
const authenticateToken = require('../middlewares/auth');
const departmentController = require('../controllers/departmentController');

router.post('/', authenticateToken,departmentController.createDepartment);

router.get('/', authenticateToken,departmentController.getAllDepartments);

router.get('/:id',authenticateToken, departmentController.getDepartmentById);

router.get('/get-steps/:id',authenticateToken,departmentController.getStepsByDepartmentId);

router.put('/:id', authenticateToken,departmentController.updateDepartment);

router.delete('/:id', authenticateToken,departmentController.deleteDepartment);

module.exports = router;
