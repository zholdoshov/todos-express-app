const { v4: uuidv4 } = require('uuid');
const pool = require('../db/index'); // Assuming you have a pool.js file that exports the MySQL connection pool
// const { get } = require('../routes/todos');

async function getTodosFromDB(userId) {
    try {
        const [rows] = await pool.query('SELECT * FROM todos WHERE user_id = ?', [userId]);
        if (!rows || rows.length === 0) {
            console.log('No todos found for the user');
            return []; // Return an empty array if no todos are found
        }
        return rows; // Return all todos
    } catch (error) {
        console.error('Error fetching todos:', error);
    }
}

async function getTodoFromDB(id, userId) {
    if (!id || !userId) {
        console.error('ID and User ID are required to fetch a todo');
        return null; // Return null if id or userId is not provided
    }

    try {
        const [rows] = await pool.query('SELECT * FROM todos WHERE id = ? AND user_id = ?', [id, userId]);
        if (!rows || rows.length === 0) {
            console.log(`Todo with id ${id} not found for user ${userId}`);
            return null; // Return null if no todo is found
        }
        return rows[0]; // Return the first todo with the given id
    }
    catch (error) {
        console.error(`Error fetching todo with id ${id}:`, error);
        return null; // Return null in case of an error
    }
}

async function addTodoToDB(userId, title) {
    try {
        const id = uuidv4(); // Generate a unique ID for the todo
        await pool.query('INSERT INTO todos (id, user_id, title) VALUES (?, ?, ?)', [id, userId, title]);
        return getTodoFromDB(id, userId); // Return the newly added todo
    } catch (error) {
        console.error('Error adding todo:', error);
    }
}

async function updateTodoInDB(id, userId, completed) {
    try {
        await pool.query('UPDATE todos SET completed = ? WHERE id = ? AND user_id = ?', [completed, id, userId]);
        console.log(`Updated todo with ID: ${id}, Completed: ${completed}`);
        return getTodoFromDB(id, userId); // Return the updated todo
    } catch (error) {
        console.error(`Error updating todo with id ${id}:`, error);
    }
}

async function deleteTodoFromDB(id, userId) {
    try {
        await pool.query('DELETE FROM todos WHERE id = ? AND user_id = ?', [id, userId]);
        console.log(`Deleted todo with ID: ${id}`);
    } catch (error) {
        console.error(`Error deleting todo with id ${id}:`, error);
    }
}

module.exports = {
    getTodosFromDB,
    getTodoFromDB,
    addTodoToDB,
    updateTodoInDB,
    deleteTodoFromDB
};
// db.js