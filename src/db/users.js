const { v4: uuidv4 } = require('uuid');
const pool = require('./index'); // Assuming you have a pool.js file that exports the MySQL connection pool

async function getUsers() {
    try {
        const [rows] = await pool.query('SELECT * FROM users');
        return rows; // Return all todos
    } catch (error) {
        console.error('Error fetching users:', error);
    }
}

async function getUser(id) {
    try {
        const [rows] = await pool.query('SELECT * FROM users WHERE id = ?', [id]);
        return rows[0]; // Return the first user with the given id
    } catch (error) {
        console.error(`Error fetching user with id ${id}:`, error);
    }
}

async function addUser(name, email) {
    try {
        const id = uuidv4(); // Generate a unique ID for the user
        await pool.query('INSERT INTO users (id, name, email) VALUES (?, ?, ?)', [id, name, email]);
        return getUser(id); // Return the newly added user
    } catch (error) {
        console.error('Error adding user:', error);
    }
}

async function updateUser(id, name, email) {
    try {
        await pool.query('UPDATE users SET name = ?, email = ? WHERE id = ?', [name, email, id]);
        console.log(`Updated user with ID: ${id}, name: ${name}, email: ${email}`);
        return getUser(id); // Return the updated user
    } catch (error) {
        console.error(`Error updating user with id ${id}:`, error);
    }
}

async function deleteUser(id) {
    try {
        await pool.query('DELETE FROM users WHERE id = ?', [id]);
        console.log(`Deleted user with ID: ${id}`);
    } catch (error) {
        console.error(`Error deleting user with id ${id}:`, error);
    }
}

module.exports = {
    getUsers,
    getUser,
    addUser,
    updateUser,
    deleteUser
};