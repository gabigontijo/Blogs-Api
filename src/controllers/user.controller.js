const userService = require('../services/user.service');
const { BAD_REQUEST, OK, CONFLICT, CREATED, NOT_FOUND, INTERNAL_SERVER_ERROR, NO_CONTENT } = require('../utils/status-code');
const { tokenGen } = require('../utils/validateJWT');

const login = async (req, res) => {
    const { email, password } = req.body;
    const user = await userService.enterLogin(email, password);
    if (!user) {
      return res.status(BAD_REQUEST).send({ message: 'Invalid fields' });
    }

    const token = tokenGen(email);
    return res.status(OK).send({ token });
  };

  const createUser = async (req, res) => {
    const { displayName, email, password, image } = req.body;
    const newUser = await userService.createUser(displayName, email, password, image);
    if (newUser.type) {
        return res.status(CONFLICT).send({ message: newUser.message });
    }
    const token = tokenGen(email);
    return res.status(CREATED).send({ token });
  };

  const getAllUsers = async (req, res) => {
    const allUsers = await userService.getAllUsers();
    return res.status(OK).send(allUsers);
  };

  const getUserById = async (req, res) => {
    const { id } = req.params;
    const user = await userService.getUserById(id);

    if (!user) {
        return res.status(NOT_FOUND).send({ message: 'User does not exist' });
    }
    return res.status(OK).send(user);
  };

  const deleteMe = async (req, res) => {
    try {
      const { id } = req.user;
       await userService.deleteMe(id);
       return res.sendStatus(NO_CONTENT);
    } catch (error) {
      console.log(error);
      return res.status(INTERNAL_SERVER_ERROR).send({ message: 'fail to delete user' });
    }
  };

module.exports = {
    login,
    createUser,
    getAllUsers,
    getUserById,
    deleteMe,
};