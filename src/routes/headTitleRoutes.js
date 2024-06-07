const express = require('express');
const router = express.Router();
const authenticateToken = require('../middlewares/auth');
const headTitleController = require('../controllers/headTitleController');

router.post('/', authenticateToken,headTitleController.createHeadTitle);

router.get('/', authenticateToken,headTitleController.getAllHeadTitles);

router.get('/:id',authenticateToken, headTitleController.getHeadTitleById);

router.put('/:id',authenticateToken, headTitleController.updateHeadTitleById);

router.delete('/:id', headTitleController.deleteHeadTitleById);

module.exports = router;
