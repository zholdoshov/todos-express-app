const { verifyToken } = require('../util/token');

const authenticate = (req, res, next) => {
    const token = req.cookies.token;
    if (!token) {
        return res.status(401).send('Access denied. Please log in.');
    }

    const decoded = verifyToken(token);
    if (!decoded) {
        return res.status(401).send('Invalid token.');
    }

    req.user = decoded; // Attach user info to request object
    next();
}

module.exports = authenticate;