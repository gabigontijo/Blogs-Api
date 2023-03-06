const jwt = require('jsonwebtoken');

const secret = process.env.JWT_SECRET;
const jwtConfig = {
  expiresIn: '7d',
  algorithm: 'HS256',
};

 const tokenGen = (email) => jwt.sign({ data: { email } }, secret, jwtConfig);

 module.exports = tokenGen;