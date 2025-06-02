const express = require('express');
const router = express.Router();
const cookieParser = require('cookie-parser');
const { registerUser, loginUser } = require('../services/authService');

router.use(cookieParser());

const authController = async (req, res) => {
    res.status(200).send('Auth route is working');
};

const registerController = async (req, res) => {
    const { username, password } = req.body;

    try {
        const user = await registerUser(username, password);
        res.status(201).json({
            message: `User ${user.username} registered successfully`,
            user,
        });
    } catch (error) {
        res.status(400).send(error.message);
    }
};

const loginController = async (req, res) => {
    const { username, password } = req.body;

    try {
        const { token, user } = await loginUser(username, password);
        res.cookie('token', token, {
            httpOnly: true,
            sameSite: 'Strict',
        });
        res.status(200).json({
            message: 'Login successful',
            token,
            user,
        });
    } catch (error) {
        res.status(400).send(error.message);
    }
};

const logoutController = (req, res) => {
    res.clearCookie('token');
    res.status(200).send('Logout successful');
};

module.exports = {
    authController,
    registerController,
    loginController,
    logoutController,
};