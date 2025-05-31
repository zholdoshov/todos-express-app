const express = require('express');
const router = express.Router();

const {
    getTodos,
    getTodo,
    addTodo,
    updateTodo,
    deleteTodo
} = require('../db/todos');


router.get('/:userId', async (req, res) => {
    const todos = await getTodos(req.params.userId);
    if (!todos || todos.length === 0) {
        res.status(404).json({ message: 'No todos found' });
        return;
    }
    res.status(200).send(todos);
})

router.post('/', async (req, res) => {
    const { userId, title } = req.body;
    const newTodo = await addTodo(userId, title);
    res.status(201).send(newTodo);
})

router
    .route('/:id')
    .get(async (req, res) => {
        const id = req.params.id;
        const userId = req.body.userId;
        const todo = await getTodo(id, userId);
        if (!todo) {
            res.status(404).send(`Todo with id:${id} not found!`);
            return;
        }
        res.status(200).send(todo);
    })
    .patch(async (req, res) => {
        const id = req.params.id;
        const { completed, userId } = req.body;
        const todoWithGivenId = await getTodo(id, userId);

        if (!todoWithGivenId) {
            res.status(404).send(`Todo with id:${id} not found for the userId: ${userId}!`);
            return;
        }

        await updateTodo(id, userId, completed);
        res.send(`Updated todo with id:${id}`);
    })
    .delete(async (req, res) => {
        const id = req.params.id;
        const userId = req.body.userId;
        const todoWithGivenId = await getTodo(id, userId);

        if (!todoWithGivenId) {
            res.status(404).send(`Todo with id:${id} not found!`);
            return;
        }

        await deleteTodo(id, userId);
        res.send(`Deleted todo with id:${id}`);
    })

module.exports = router