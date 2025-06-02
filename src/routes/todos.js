const express = require('express');
const router = express.Router();

const { getTodosController, getTodoController, addTodoController, updateTodoController, deleteTodoController } = require('../controller/todoController');

router.get('/:userId', getTodosController);

router.post('/', addTodoController);

router
    .route('/:id')
    .get(getTodoController)
    .patch(updateTodoController)
    .delete(deleteTodoController)

module.exports = router