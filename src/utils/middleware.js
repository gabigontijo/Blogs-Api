const { BAD_REQUEST, UNAUTHORIZED } = require('./status-code');
const userService = require('../services/user.service');
const { tokenVerify } = require('./validateJWT');

const validateLoginBody = (req, res, next) => {
    const { email, password } = req.body;
    if (!email || !password) {
      return res.status(BAD_REQUEST)
        .send({ message: 'Some required fields are missing' });
    }
    next();
  };

  const validateUserDisplayName = (req, res, next) => {
    const { displayName } = req.body;
    if (displayName.length < 8) {
        return res.status(BAD_REQUEST)
        .send({ message: '"displayName" length must be at least 8 characters long' });
    }
    next();
  };

  const validateUserEmail = (req, res, next) => {
    const { email } = req.body;
    const regex = /\S+@\S+\.\S+/;
    const checkEmail = regex.test(email);
    if (!checkEmail) {
        return res.status(BAD_REQUEST)
        .send({ message: '"email" must be a valid email' });
    }
    next();
  };

  const validateUserPassword = (req, res, next) => {
    const { password } = req.body;
    if (password.length < 6) {
        return res.status(BAD_REQUEST)
        .send({ message: '"password" length must be at least 6 characters long' });
    }
    next();
  };

  const validateToken = async (req, res, next) => {
    const token = req.header('Authorization');
    if (!token) {
        return res.status(UNAUTHORIZED)
        .send({ message: 'Token not found' });
    }
    try {
        const verify = tokenVerify(token);
        const user = await userService.getUser(verify);
        if (!user) {
          return res.status(UNAUTHORIZED).send({ message: 'Expired or invalid token' });
        }
        req.user = user;
        next();
      } catch (err) {
        return res.status(UNAUTHORIZED).send({ message: 'Expired or invalid token' });
      }
  };

  const validateCategoryBody = async (req, res, next) => {
    const { name } = req.body;
    if (!name) {
        return res.status(BAD_REQUEST)
        .send({ message: '"name" is required' });
    }
    next();
  };

  const validationPostBody = async (req, res, next) => {
    const { title, content, categoryIds } = req.body;
    if (!title || !content || !categoryIds) {
      return res.status(BAD_REQUEST)
      .send({ message: 'Some required fields are missing' });
    }
    next();
  };

  const validationPostUpdateBody = async (req, res, next) => {
    const { title, content } = req.body;
    if (!title || !content) {
      return res.status(BAD_REQUEST)
      .send({ message: 'Some required fields are missing' });
    }
    next();
  };
module.exports = {
    validateLoginBody,
    validateUserDisplayName,
    validateUserEmail,
    validateUserPassword,
    validateToken,
    validateCategoryBody,
    validationPostBody,
    validationPostUpdateBody,
};