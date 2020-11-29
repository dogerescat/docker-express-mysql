const express = require('express');
const router = express.Router();
const user = require('../controller/user.controller');
const jwt = require('jsonwebtoken');
const registerValidation = require('../registerValidator');
const loginValidation = require('../loginValidator');
require('dotenv').config();
const env = process.env;

const auth = (req, res, next) => {
  let token = '';
  if (
    req.session.accessToken &&
    req.session.accessToken.split(' ')[0] === 'Bearer'
  ) {
    token = req.session.accessToken.split(' ')[1];
  } else {
    res.redirect('/login');
    return;
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
};

router.get('/', user.register);
router.post('/', registerValidation, user.create);
router.get('/login', user.login);
router.post('/login', loginValidation, user.authentication);
router.get('/logout', auth, user.logout);

module.exports = router;
