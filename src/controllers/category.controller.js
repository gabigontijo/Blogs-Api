const { BAD_REQUEST, CREATED, OK } = require('../utils/status-code');
const categoryService = require('../services/category.service');

const createCategory = async (req, res) => {
    const { name } = req.body;
    const category = await categoryService.createCategory(name);
    if (category.type) {
        return res.status(BAD_REQUEST).send({ message: category.message });
    }
    return res.status(CREATED).send(category);
};

const getAllCategories = async (req, res) => {
    const allCategories = await categoryService.getAllCategories();
    return res.status(OK).send(allCategories);
};

module.exports = { createCategory, getAllCategories };