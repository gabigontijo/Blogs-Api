const express = require('express');
const userController = require('../controllers/user.controller.js');
const { validateLoginBody } = require('../utils/middleware.js');

const routerLogin = express.Router();

routerLogin.post('/', validateLoginBody, userController.login);

module.exports = routerLogin;