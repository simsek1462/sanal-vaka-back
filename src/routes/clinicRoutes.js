const express = require('express');
const router = express.Router();
const clinicController = require('../controllers/clinicController');
const authenticateToken = require('../middlewares/auth'); 

router.get('/', authenticateToken, clinicController.getAllClinics); 
router.get('/:id', authenticateToken, clinicController.getClinicById); 
router.post('/', authenticateToken, clinicController.createClinic);
router.put('/:id', authenticateToken, clinicController.updateClinic); 
router.delete('/:id', authenticateToken, clinicController.deleteClinic);
router.get('/department/:departmentId', authenticateToken, clinicController.getClinicsByDepartmentId);
module.exports = router;
