const mysql = require('mysql2')
const { v4: uuidv4 } = require('uuid');
const dotenv = require('dotenv');
dotenv.config();

const pool = mysql.createPool({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
}).promise();

async function getTodos() {
    try {
        const [rows] = await pool.query('SELECT * FROM todos');
        return rows; // Return all todos
    } catch (error) {
        console.error('Error fetching todos:', error);
    }
}

async function getTodo(id) {
    try {
        const [rows] = await pool.query('SELECT * FROM todos WHERE id = ?', [id]);
        return rows[0]; // Return the first todo with the given id
    } catch (error) {
        console.error(`Error fetching todo with id ${id}:`, error);
    }
}

async function addTodo(title) {
    try {
        const id = uuidv4(); // Generate a unique ID for the todo
        await pool.query('INSERT INTO todos (id, title) VALUES (?, ?)', [id, title]);
        return getTodo(id); // Return the newly added todo
    } catch (error) {
        console.error('Error adding todo:', error);
    }
}

async function updateTodo(id, completed) {
    try {
        await pool.query('UPDATE todos SET completed = ? WHERE id = ?', [completed, id]);
        console.log(`Updated todo with ID: ${id}, completed: ${completed}`);
        return getTodo(id); // Return the updated todo
    } catch (error) {
        console.error(`Error updating todo with id ${id}:`, error);
    }
}

async function deleteTodo(id) {
    try {
        await pool.query('DELETE FROM todos WHERE id = ?', [id]);
        console.log(`Deleted todo with ID: ${id}`);
    } catch (error) {
        console.error(`Error deleting todo with id ${id}:`, error);
    }
}

module.exports = {
    getTodos,
    getTodo,
    addTodo,
    updateTodo,
    deleteTodo
};
// db.js