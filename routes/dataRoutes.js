const express = require('express');
const router = express.Router();
const { getData, addData, updateData, deleteData } = require('../controllers/dataController');

router.get('/', getData);

router.post('/',addData);

router.put('/', updateData);

router.delete('/:id', deleteData);

module.exports = router;
