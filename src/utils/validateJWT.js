const jwt = require('jsonwebtoken');

const secret = process.env.JWT_SECRET;
const jwtConfig = {
  expiresIn: '7d',
  algorithm: 'HS256',
};

 const tokenGen = (email) => {
    const token = jwt.sign({ data: { email } }, secret, jwtConfig);
    return token;
 };

 const tokenVerify = (token) => {
    const { data: { email } } = jwt.verify(token, secret);
    return email;
};

 module.exports = {
    tokenGen,
    tokenVerify,
 };