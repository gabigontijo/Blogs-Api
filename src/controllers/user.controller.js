const userService = require('../services/user.service');
const { BAD_REQUEST, OK, CONFLICT, CREATED } = require('../utils/status-code');
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

  const createUser = async (req, res) => {
    const { displayName, email, password, image } = req.body;
    const newUser = await userService.creatUser(displayName, email, password, image);
    if (newUser.type) {
        return res.status(CONFLICT).send({ message: newUser.message });
    }
    const token = tokenGen();
    res.status(CREATED).send({ token });
  };
module.exports = {
    login,
    createUser,
};