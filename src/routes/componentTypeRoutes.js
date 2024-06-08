const express = require('express');
const router = express.Router();
const componentTypeController = require('../controllers/componentTypeController');


router.post('/', componentTypeController.createComponentType);


router.get('/', componentTypeController.getAllComponentTypes);


router.get('/:id', componentTypeController.getComponentTypeById);


router.put('/:id', componentTypeController.updateComponentType);


router.delete('/:id', componentTypeController.deleteComponentType);

module.exports = router;
