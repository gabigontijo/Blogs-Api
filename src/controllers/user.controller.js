const userService = require('../services/user.service');
const { BAD_REQUEST, OK } = require('../utils/status-code');
const tokenGen = require('../utils/validateJWT');

const login = async (req, res) => {
    const { email, password } = req.body;
    const user = await userService.enterLogin(email, password);
    if (!user) {
      return res.status(BAD_REQUEST).send({ message: 'Invalid fields' });
    }

    const token = tokenGen();
    res.status(OK).send({ token });
  };

module.exports = {
    login,
};