const express = require('express');
const router = express.Router();

const {
    getUsers,
    getUserWithId,
    userExists,
    addUser,
    updateUser,
    deleteUser
} = require('../db/users');


router.get('/', async (req, res) => {
    const users = await getUsers();
    if (!users || users.length === 0) {
        res.status(404).send('No users found');
        return;
    }
    res.status(200).send(users);
});

router.delete('/deleteUser', async (req, res) => {
    const { id } = req.body;
    if (!id) {
        return res.status(400).send('User ID is required');
    }

    const user = await getUserWithId(id);
    console.log(`User with ID:${id} found:`, user);
    if (!user) {
        return res.status(404).send(`User with ID:${id} not found!`);
    }

    await deleteUser(id);
    res.status(200).send(`Deleted user with ID:${id}`);
});

module.exports = router;