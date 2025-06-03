const pool = require('../db/index'); // Assuming you have a pool.js file that exports the MySQL connection pool

async function getUsersFromDB() {
    try {
        const [rows] = await pool.query('SELECT * FROM users');
        return rows; // Return all todos
    } catch (error) {
        console.error('Error fetching users:', error);
    }
}

async function getUserWithUsernameFromDB(username) {
    try {
        const [rows] = await pool.query('SELECT * FROM users WHERE username = ?', [username]);
        return rows[0]; // Return the first user with the given username
    } catch (error) {
        console.error(`Error fetching user with username ${username}:`, error);
    }
}

async function getUserWithIdFromDB(id) {
    try {
        const [rows] = await pool.query('SELECT * FROM users WHERE id = ?', [id]);
        return rows[0]; // Return the first user with the given id
    } catch (error) {
        console.error(`Error fetching user with id ${id}:`, error);
    }
}

async function userExistsInDB(username) {
    try {
        const [rows] = await pool.query('SELECT * FROM users WHERE username = ?', [username]);
        return rows.length > 0; // Return true if user exists, false otherwise
    } catch (error) {
        console.error(`Error checking if user ${username} exists:`, error);
    }
}

async function addUserToDB(id, username, password) {
    try {
        await pool.query('INSERT INTO users (id, username, password) VALUES (?, ?, ?)', [id, username, password]);
        return getUser(id); // Return the newly added user
    } catch (error) {
        console.error('Error adding user:', error);
    }
}

async function updateUserInDB(id, username) {
    try {
        await pool.query('UPDATE users SET username = ? WHERE id = ?', [username, id]);
        console.log(`Updated user with ID: ${id}, username: ${username}`);
        return getUser(id); // Return the updated user
    } catch (error) {
        console.error(`Error updating user with id ${id}:`, error);
    }
}

async function deleteUserFromDB(id) {
    try {
        await pool.query('DELETE FROM users WHERE id = ?', [id]);
        console.log(`Deleted user with ID: ${id}`);
    } catch (error) {
        console.error(`Error deleting user with id ${id}:`, error);
    }
}

module.exports = {
    getUsersFromDB,
    getUserWithUsernameFromDB,
    getUserWithIdFromDB,
    userExistsInDB,
    addUserToDB,
    updateUserInDB,
    deleteUserFromDB
};