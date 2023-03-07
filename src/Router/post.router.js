const express = require('express');
const postController = require('../controllers/post.controller');
const { validateToken, validationPostBody } = require('../utils/middleware.js');

const routerPost = express.Router();

routerPost.post('/', validateToken, validationPostBody, postController.createBlogPost);
routerPost.get('/', validateToken, postController.getBlogPost);

module.exports = routerPost;