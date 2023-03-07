const Sequelize = require('sequelize');
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
        console.log(']]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]', blogPost.id);

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

const getBlogPost = async (id) => {
    const result = await BlogPost.findOne({
        where: { userId: id },
        include: [{ model: User, as: 'user', attributes: { exclude: 'password' } },
                  { model: Category, as: 'categories', through: { attributes: [] } }],
    });
    return [result];
};

module.exports = { createBlogPost, getBlogPost };