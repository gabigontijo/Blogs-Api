 const postService = require('../services/post.service');
 const { CREATED, BAD_REQUEST, OK, NOT_FOUND,
    UNAUTHORIZED, NO_CONTENT, INTERNAL_SERVER_ERROR } = require('../utils/status-code');

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

const updatePostById = async (req, res) => {
    const { title, content } = req.body;
    const { id } = req.params;
    const { id: userId } = req.user;
    const post = await postService.updatePostById(title, content, Number(id), userId);
    if (post.type) {
        return res.status(UNAUTHORIZED).send({ message: post.message });
    }
    const updatedPost = await postService.getBlogPostById(id);
    return res.status(OK).send(updatedPost);
};

const deletePost = async (req, res) => {
    try {
        const { id } = req.params;
        const { id: userId } = req.user;
        const post = await postService.deletePost(Number(id), userId);
        console.log('dfsfdsfsdfsdfsdfdsfdsfds', post);
        if (post.type === 401) {
            return res.status(UNAUTHORIZED).send({ message: post.message });
        }
        if (post.type === 404) {
            return res.status(NOT_FOUND).send({ message: post.message });
        }
            return res.sendStatus(NO_CONTENT);
    } catch (error) {
        console.log(error);
        return res.status(INTERNAL_SERVER_ERROR).send({ message: 'fail to delete post' });
    }
};

const getBlogPostSearch = async (req, res) => {
    const { q } = req.query;
    const search = await postService.getBlogPostSearch(q);
    return res.status(OK).send(search);
};

module.exports = {
    createBlogPost,
    getBlogPost,
    getBlogPostById,
    updatePostById,
    deletePost,
    getBlogPostSearch };