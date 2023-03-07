const { Category } = require('../models');

const createCategory = async (name) => {
    try {
        const newCategory = await Category.create({ name });
        return newCategory;
    } catch (e) {
        return { type: 'error', message: 'Category already registered' };
    }
};

const getCategory = async () => {

};

module.exports = { createCategory, getCategory };