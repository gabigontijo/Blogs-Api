const express = require('express');
const postController = require('../controllers/post.controller');
const { validateToken, validationPostBody,
    validationPostUpdateBody } = require('../utils/middleware.js');

const routerPost = express.Router();

routerPost.post('/', validateToken, validationPostBody, postController.createBlogPost);
routerPost.get('/', validateToken, postController.getBlogPost);
routerPost.get('/search', validateToken, postController.getBlogPostSearch);
routerPost.get('/:id', validateToken, postController.getBlogPostById);
routerPost.put('/:id', validateToken, validationPostUpdateBody, postController.updatePostById);
routerPost.delete('/:id', validateToken, postController.deletePost);

module.exports = routerPost;