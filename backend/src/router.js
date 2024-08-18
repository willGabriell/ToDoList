const express = require('express');
const taskController = require('./controller/tasksController');


const router = express.Router();

router.get('/tasks', taskController.getAll);

module.exports = router;