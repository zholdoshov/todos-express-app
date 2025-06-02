const express = require('express');
const router = express.Router();
const cookieParser = require('cookie-parser');

const { authController, registerController, loginController, logoutController } = require('../controller/authController');

router.use(cookieParser());

router.get('/', authController);

router.post('/register', registerController);

router.post('/login', loginController);

router.post('/logout', logoutController);


module.exports = router;