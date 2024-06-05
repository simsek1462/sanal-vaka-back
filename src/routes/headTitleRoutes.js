const express = require('express');
const router = express.Router();
const headTitleController = require('../controllers/headTitleController');

router.post('/', headTitleController.createHeadTitle);

router.get('/', headTitleController.getAllHeadTitles);

router.get('/:id', headTitleController.getHeadTitleById);

router.put('/:id', headTitleController.updateHeadTitleById);

router.delete('/:id', headTitleController.deleteHeadTitleById);

module.exports = router;
