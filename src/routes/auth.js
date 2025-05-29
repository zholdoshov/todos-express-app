const express = require('express');
const router = express.Router();
const cookieParser = require('cookie-parser');
router.use(cookieParser());

const {
    signToken,
    verifyToken
} = require('../util/token')
// Middleware to parse JSON and URL-encoded bodies

router.get('/', (req, res) => {
    res.status(200).send('Auth route is working');
});

router.post('/register', (req, res) => {
    const { username, password } = req.body;
    // Here you would typically save the user to a database
    if (username && password) {
        res.status(201).send(`User ${username} registered successfully`);
    } else {
        res.status(400).send('Username and password are required');
    }
});

router.post('/login', (req, res) => {
    const { username, password } = req.body;
    // Here you would typically check the username and password against a database
    if (username === 'niko' && password === '123') {
        // Set a cookie to indicate the user is logged in
        res.cookie('auth', 'true', { httpOnly: true });
        res.status(200).send('Login successful');
    } else {
        res.status(401).send('Invalid credentials');
    }
});

router.post('/logout', (req, res) => {
    // Clear the auth cookie
    res.clearCookie('auth');
    res.status(200).send('Logout successful');
});


module.exports = router;