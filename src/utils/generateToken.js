const jwt = require('jsonwebtoken');

function generateToken(payload) {
  const secret = process.env.JWT_SECRET || 'secretkey';
  return jwt.sign(payload, secret, { expiresIn: '7d' });
}

module.exports = generateToken;
