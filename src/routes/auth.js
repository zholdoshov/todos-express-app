const express = require('express');
const router = express.Router();
const cookieParser = require('cookie-parser');
const { userExists, addUser, getUserWithUsername } = require('../db/users');
const { v4: uuidv4 } = require('uuid');
const { encryptPassword, comparePassword } = require('../util/password');

router.use(cookieParser());

const {
    signToken,
    verifyToken
} = require('../util/token');
// Middleware to parse JSON and URL-encoded bodies

router.get('/', (req, res) => {
    res.status(200).send('Auth route is working');
});

router.post('/register', async (req, res) => {
    const { username, password } = req.body;
    // Here you would typically save the user to a database
    if (!username || !password) {
        res.status(400).send('Username and password are required');
    }

    const existUser = await userExists(username);
    if (existUser) {
        return res.status(400).send('User already exists');
    }

    const newUser = {
        id: uuidv4(),
        username,
        password: encryptPassword(password),
    };

    const { password: _, ...userWithoutPassword } = newUser; // Remove password from the object before sending it to the database

    addUser(newUser.id, newUser.username, newUser.password)
        .then(user => {
            res.status(201).json({
                message: `User ${user.username} registered successfully`,
                user: userWithoutPassword
            });
        })
        .catch(err => {
            console.error('Error registering user:', err);
            res.status(500).send('Internal server error');
        });
});

router.post('/login', async (req, res) => {
    const { username, password } = req.body;

    const existUser = await userExists(username);
    if (!existUser) {
        return res.status(400).send('User not found');
    }

    const user = await getUserWithUsername(username);
    if (!comparePassword(password, user.password)) {
        return res.status(401).send('Invalid credentials');
    }
    const { password: _, ...userWithoutPassword } = user; // Remove password from the user object
    // Generate a token for the user
    const token = signToken({ id: user.id, username: user.username });
    console.log(`Generated token: ${token}`);
    // Set the token in a cookie
    res.cookie('token', token, {
        httpOnly: true, // Prevents client-side JavaScript from accessing the cookie
        sameSite: 'Strict' // Helps prevent CSRF attacks
    });
    res.status(200).json({
        message: 'Login successful',
        token: token,
        user: userWithoutPassword,
    });
});

router.post('/logout', async (req, res) => {
    // Clear the auth cookie
    res.clearCookie('token');
    res.status(200).send('Logout successful');
});


module.exports = router;