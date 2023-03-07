 const postService = require('../services/post.service');
 const { CREATED, BAD_REQUEST, OK, NOT_FOUND } = require('../utils/status-code');

const createBlogPost = async (req, res) => {
    const { title, content, categoryIds } = req.body;
    const { id } = req.user;
    try {
        const blogPost = await postService.createBlogPost(title, content, categoryIds, id);
    console.log('depois do service', blogPost);
    return res.status(CREATED).send(blogPost);
    } catch (error) {
        return res.status(BAD_REQUEST).send({ message: 'one or more "categoryIds" not found' });
    }
};

const getBlogPost = async (req, res) => {
    const { id } = req.user;
    const blogPost = await postService.getBlogPost(id);
    return res.status(OK).send(blogPost);
};

const getBlogPostById = async (req, res) => {
    const { id } = req.params;
    const blogPost = await postService.getBlogPostById(id);
    if (!blogPost) {
        return res.status(NOT_FOUND).send({ message: 'Post does not exist' });
    }
    return res.status(OK).send(blogPost);
};

module.exports = { createBlogPost, getBlogPost, getBlogPostById };