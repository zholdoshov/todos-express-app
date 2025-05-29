const express = require('express');
const { v4: uuidv4 } = require('uuid');
const router = express.Router();

const {
    getTodos,
    getTodo,
    addTodo,
    updateTodo,
    deleteTodo
} = require('../db');


router.get('/', async (req, res) => {
    const todos = await getTodos();
    if (!todos || todos.length === 0) {
        res.status(404).send('No todos found');
        return;
    }
    res.status(200).send(todos);
})

router.post('/', async (req, res) => {
    const { title } = req.body;
    const newTodo = await addTodo(title);
    res.status(201).send(newTodo);
})

router
    .route('/:id')
    .get(async (req, res) => {
        const id = req.params.id;
        const todo = await getTodo(id);
        if (!todo) {
            res.status(404).send(`Todo with id:${id} not found!`);
            return;
        }
        res.status(200).send(todo);
    })
    .patch(async (req, res) => {
        const id = req.params.id;
        const { completed } = req.body;
        const todoWithGivenId = await getTodo(id);

        if (!todoWithGivenId) {
            res.status(404).send(`Todo with id:${id} not found!`);
            return;
        }

        await updateTodo(id, completed);
        res.send(`Updated todo with id:${id}`);
    })
    .delete(async (req, res) => {
        const id = req.params.id;
        const todoWithGivenId = await getTodo(id);

        if (!todoWithGivenId) {
            res.status(404).send(`Todo with id:${id} not found!`);
            return;
        }

        await deleteTodo(id);
        res.send(`Deleted todo with id:${id}`);
    })

module.exports = router