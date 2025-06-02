const express = require('express');
const router = express.Router();

const { getUsersController, deleteUserController } = require('../controller/userController');


router.get('/', getUsersController);

router.delete('/deleteUser', deleteUserController);

module.exports = router;