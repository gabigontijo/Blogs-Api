const express = require('express');
const categoryController = require('../controllers/category.controller');
const { validateToken, validateCategoryBody } = require('../utils/middleware.js');

const routerCategory = express.Router();

routerCategory.post('/', validateToken, validateCategoryBody, categoryController.createCategory);
// routerCategory.get('/', validateToken, categoryController.getCategory);

module.exports = routerCategory;