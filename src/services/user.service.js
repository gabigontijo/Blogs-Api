const { User } = require('../models');

const enterLogin = async (email, password) => {
    const user = await User.findOne({ where: { email, password } });
    return user;
};

module.exports = { enterLogin };