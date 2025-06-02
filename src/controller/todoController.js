const { getTodos, getTodo, addTodo, updateTodo, deleteTodo } = require('../services/todoService');

const getTodosController = async (req, res) => {
    try {
        const todos = await getTodos(req.params.userId);
        if (!todos || todos.length === 0) {
            return res.status(404).json({ message: 'No todos found for this user' });
        }
        res.status(200).send(todos);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

const getTodoController = async (req, res) => {
    try {
        const id = req.body.id;
        const userId = req.params.userId;
        const todo = await getTodo(id, userId);
        if (!todo) {
            return res.status(404).send(`Todo with id:${id} not found!`);
        }
        res.status(200).send(todo);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
}

const addTodoController = async (req, res) => {
    try {
        const { userId, title } = req.body;
        const newTodo = await addTodo(userId, title);
        res.status(201).send(newTodo);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

const updateTodoController = async (req, res) => {
    try {
        const id = req.params.id;
        const { completed, userId } = req.body;
        const todoWithGivenId = await getTodo(id, userId);

        if (!todoWithGivenId) {
            res.status(404).send(`Todo with id:${id} not found for the userId: ${userId}!`);
            return;
        }

        await updateTodo(id, userId, completed);
        res.send(`Updated todo with id:${id}`);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

const deleteTodoController = async (req, res) => {
    try {
        const id = req.params.id;
        const userId = req.body.userId;
        const todoWithGivenId = await getTodo(id, userId);

        if (!todoWithGivenId) {
            return res.status(404).send(`Todo with id:${id} not found!`);
        }

        await deleteTodo(id, userId);
        res.send(`Deleted todo with id:${id}`);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

module.exports = {
    getTodosController,
    getTodoController,
    addTodoController,
    updateTodoController,
    deleteTodoController,
};