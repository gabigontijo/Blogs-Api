const { User } = require('../models');

const enterLogin = async (email, password) => {
    const user = await User.findOne({ where: { email, password } });
    return user;
};

const createUser = async (displayName, email, password, image) => {
    try {
        const newUser = await User.create({ displayName, email, password, image });
        console.log(newUser);
        return newUser;
    } catch (e) {
        return { type: 'error', message: 'User already registered' };
    }
};

const getUser = async (email) => {
    const user = await User.findOne({ where: { email } });
    return user;
};

const getAllUsers = async () => {
    const allUsers = await User.findAll({
        attributes: { exclude: 'password' },
    });
    return allUsers;
};

module.exports = { enterLogin, createUser, getUser, getAllUsers };