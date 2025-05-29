const jwt = require('jsonwebtoken');

const JWT_SECRET = process.env.JWT_SECRET || 'todos_app_secret_key';

const signToken = (user) => {
    return jwt.sign(user, JWT_SECRET, {
        expiresIn: '1h' // Token will expire in 1 hour
    });
}

const verifyToken = (token) => {
    try {
        return jwt.verify(token, JWT_SECRET);
    } catch (error) {
        return null; // Token is invalid or expired
    }
}

module.exports = {
    signToken,
    verifyToken
};
// This module provides functions to sign and verify JWT tokens, as well as middleware to authenticate requests using those tokens.