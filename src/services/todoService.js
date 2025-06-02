const { getTodosFromDB, getTodoFromDB, addTodoToDB, updateTodoInDB, deleteTodoFromDB } = require('../db/todos');

const getTodos = async (userId) => {
    return await getTodosFromDB(userId);
};

const getTodo = async (todoId, userId) => {
    return await getTodoFromDB(todoId, userId);
};

const addTodo = async (userId, todoData) => {
    return await addTodoToDB(userId, todoData);
};

const updateTodo = async (todoId, userId, completed) => {
    return await updateTodoInDB(todoId, userId, completed);
};

const deleteTodo = async (todoId, userId) => {
    return await deleteTodoFromDB(todoId, userId);
};

module.exports = {
    getTodos,
    getTodo,
    addTodo,
    updateTodo,
    deleteTodo,
};