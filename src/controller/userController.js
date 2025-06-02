const { getUser,
    getUsers,
    userExists,
    addUser,
    updateUser,
    deleteUser } = require('../services/userService');

const getUsersController = async (req, res) => {
    try {
        const users = await getUsers();
        if (!users || users.length === 0) {
            return res.status(404).send('No users found');
        }
        res.status(200).send(users);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
}

const getUserWithIdController = async (req, res) => {
    try {
        const userId = req.params.id;
        const user = await getUser(userId);
        if (!user) {
            return res.status(404).send(`User with ID:${userId} not found!`);
        }
        res.status(200).send(user);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
}

const userExistsController = async (req, res) => {
    try {
        const { username } = req.body;
        if (!username) {
            return res.status(400).send('Username is required');
        }

        const exists = await userExists(username);
        if (exists) {
            return res.status(200).send(`User with username:${username} exists`);
        } else {
            return res.status(404).send(`User with username:${username} does not exist`);
        }
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
}

const addUserController = async (req, res) => {
    try {
        const { id, username, password } = req.body;
        if (!id || !username || !password) {
            return res.status(400).send('ID, username, and password are required');
        }

        const exists = await userExists(username);
        if (exists) {
            return res.status(409).send(`User with username:${username} already exists`);
        }

        const newUser = await addUser(id, username, password);
        res.status(201).send(newUser);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
}

const updateUserController = async (req, res) => {
    try {
        const { id, username } = req.body;
        if (!id || !username) {
            return res.status(400).send('ID and username are required');
        }

        const user = await getUser(id);
        if (!user) {
            return res.status(404).send(`User with ID:${id} not found!`);
        }

        const updatedUser = await updateUser(id, username);
        res.status(200).send(updatedUser);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
}

const deleteUserController = async (req, res) => {
    try {
        const { id } = req.body;
        if (!id) {
            return res.status(400).send('User ID is required');
        }

        const user = await getUser(id);
        console.log(`User with ID:${id} found:`, user);
        if (!user) {
            return res.status(404).send(`User with ID:${id} not found!`);
        }

        await deleteUser(id);
        res.status(200).send(`Deleted user with ID:${id}`);
    }
    catch (error) {
        res.status(500).json({ error: error.message });
    }
}

module.exports = {
    getUsersController,
    getUserWithIdController,
    userExistsController,
    addUserController,
    updateUserController,
    deleteUserController
};