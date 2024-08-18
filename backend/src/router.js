const express = require('express');
const taskController = require('./controller/tasksController');
const tasksMiddleware = require('./middlewares/tasksMiddleware')

const router = express.Router();

router.get('/tasks', taskController.getAll);
router.post('/tasks', tasksMiddleware.validateFieldTitle, taskController.createTask);
router.delete('/tasks/:id', taskController.deleteTask);
router.put('/tasks/:id', tasksMiddleware.validateFieldTitle,tasksMiddleware.validateFieldStatus, taskController.updateTask);

module.exports = router;