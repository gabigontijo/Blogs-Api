const { BAD_REQUEST } = require('./status-code');

const validateLoginBody = (req, res, next) => {
    const { email, password } = req.body;
    if (!email || !password) {
      return res.status(BAD_REQUEST)
        .send({ message: 'Some required fields are missing' });
    }
    next();
  };

module.exports = {
    validateLoginBody,
};