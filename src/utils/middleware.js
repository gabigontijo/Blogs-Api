const { BAD_REQUEST } = require('./status-code');

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

module.exports = {
    validateLoginBody,
    validateUserDisplayName,
    validateUserEmail,
    validateUserPassword,
};