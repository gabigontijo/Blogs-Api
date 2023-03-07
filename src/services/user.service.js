const { User } = require('../models');

const enterLogin = async (email, password) => {
    const user = await User.findOne({ where: { email, password } });
    return user;
};

const creatUser = async (displayName, email, password, image) => {
    try {
        const newUser = await User.create({ displayName, email, password, image });
        return newUser;
    } catch (e) {
        return { type: 'error', message: 'User already registered' };
    }
};
module.exports = { enterLogin, creatUser };