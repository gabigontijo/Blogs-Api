const { Category } = require('../models');

const createCategory = async (name) => {
    try {
        const newCategory = await Category.create({ name });
        return newCategory;
    } catch (e) {
        return { type: 'error', message: 'Category already registered' };
    }
};

const getAllCategories = async () => {
    const allCategories = await Category.findAll();
    return allCategories;
};

module.exports = { createCategory, getAllCategories };