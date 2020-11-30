const jwt = require('jsonwebtoken');
require('dotenv').config();
const env = process.env;

module.exports = (req, res, next) => {
  try {
    let token = '';
    if (
      req.session.accessToken &&
      req.session.accessToken.split(' ')[0] === 'Bearer'
    ) {
      token = req.session.accessToken.split(' ')[1];
    } else {
      throw new Error('error');
    }
    jwt.verify(token, env.SELECT_KEY, (err, decoded) => {
      if (err) {
        res.redirect('/login');
      } else {
        req.decoded = decoded;
        req.token = token;
        next();
      }
    });
  } catch {
    res.redirect('/login');
  }
};
