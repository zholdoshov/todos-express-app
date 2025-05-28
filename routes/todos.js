const express = require('express');
const { v4: uuidv4 } = require('uuid');
const router = express.Router();

let todos = [
    {
        id: uuidv4(),
        title: 'Go to gym',
        completed: false,
    },
    {
        id: uuidv4(),
        title: 'Do homeworks',
        completed: false,
    },
]

router.get('/', (req, res) => {
    res.send(todos);
})

router.post('/', (req, res) => {

    const { title } = req.body;

    const newTodo = {
        id: uuidv4(),
        title: title,
        completed: false,
    }

    todos.push(newTodo);
    res.status(201).send(newTodo);
})

router
    .route('/:id')
    .get((req, res) => {
        const id = req.params.id;
        const todoWithGivenId = todos.find(todo => todo.id === id);

        if (!todoWithGivenId) {
            res.status(404).send(`Todo with id:${id} not found!`);
            return;
        }
        res.send(`Get todo with id:${id}`);
    })
    .patch((req, res) => {
        const id = req.params.id;
        const todoToUpdate = todos.find(todo => todo.id === id);

        if (!todoToUpdate) {
            res.status(404).send(`Todo with id:${id} not found!`);
            return;
        }

        todos.forEach(todo => {
            if (todo.id === id) {
                todo.completed = true;
            }
        })

        res.send(todoToUpdate);
    })
    .delete((req, res) => {
        const id = req.params.id;
        const todoWithGivenId = todos.find(todo => todo.id === id);

        if (!todoWithGivenId) {
            res.status(404).send(`Todo with id:${id} not found!`);
            return;
        }

        todos = todos.filter(todo => todo.id !== id);

        res.send(`Delete todo with id:${id}`);
    })

module.exports = router