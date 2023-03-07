const express = require('express');
const userController = require('../controllers/user.controller.js');
const { validateUserDisplayName, validateUserEmail,
     validateUserPassword, validateToken } = require('../utils/middleware.js');

const routerUser = express.Router();

routerUser.post('/', validateUserDisplayName,
validateUserEmail, validateUserPassword, userController.createUser);

routerUser.get('/', validateToken, userController.getAllUsers);

module.exports = routerUser;