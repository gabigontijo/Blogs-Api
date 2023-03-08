const Sequelize = require('sequelize');
const { Op } = require('sequelize');
const { PostCategory, BlogPost, User, Category } = require('../models');

const env = process.env.NODE_ENV || 'development';
const config = require('../config/config.js')[env];

let sequelize;
if (config.use_env_variable) {
  sequelize = new Sequelize(process.env[config.use_env_variable], config);
} else {
  sequelize = new Sequelize(config.database, config.username, config.password, config);
}

const createBlogPost = async (title, content, categoryIds, userId) => {
    const result = await sequelize.transaction(async (t) => {
        const lista = [];
        const blogPost = await BlogPost.create({ title, content, userId }, { transaction: t });

        categoryIds.forEach((categoryId) => {
            console.log('coisa desse bem');
            lista.push({ postId: blogPost.id, categoryId });
        });
         await PostCategory.bulkCreate(lista, { transaction: t });

        return blogPost;
    });
    console.log('result service', result);
    return result;
};

const getBlogPost = async (userId) => {
    const result = await BlogPost.findOne({
        where: { userId },
        include: [{ model: User, as: 'user', attributes: { exclude: 'password' } },
                  { model: Category, as: 'categories', through: { attributes: [] } }],
    });
    return [result];
};

const getBlogPostById = async (id) => {
    const result = await BlogPost.findOne({
        where: { id },
        include: [{ model: User, as: 'user', attributes: { exclude: 'password' } },
                  { model: Category, as: 'categories', through: { attributes: [] } }],
    });
    return result;
};

const updatePostById = async (title, content, id, userId) => {
    const [updated] = await BlogPost.update({ title, content }, {
        where: { id, userId },
    });
    console.log(updated);
      if (!updated) {
        return { type: 'error', message: 'Unauthorized user' };
    }
    return updated;
};

const deletePost = async (id, userId) => {
    const checkPost = await BlogPost.findOne({
        where: { id },
    });
    if (!checkPost) {
        return { type: 404, message: 'Post does not exist' };
    }
    if (checkPost.userId !== userId) {
        return { type: 401, message: 'Unauthorized user' };
    }
     await BlogPost.destroy({
        where: { id },
    });
    return { type: null };
    };

    const getBlogPostSearch = async (q) => {
         const search = await BlogPost.findAll({
            where: {
                [Op.or]: [
                    { title: { [Op.like]: `%${q}%` },
                    },
                    { content: { [Op.like]: `%${q}%` },
                    },
                ],
            },
            include: [{ model: User, as: 'user', attributes: { exclude: 'password' } },
                  { model: Category, as: 'categories', through: { attributes: [] } }],
        });
    return search;
    };

module.exports = {
    createBlogPost,
    getBlogPost,
    getBlogPostById,
    updatePostById,
    deletePost,
    getBlogPostSearch };