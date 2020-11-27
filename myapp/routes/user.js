const express = require('express');
const router = express.Router();
const user = require('../controller/user.controller');
const User = require('../model/user');
const jwt = require('jsonwebtoken');
const JwtStrategy = require('passport-jwt').Strategy;
const ExtractJwt = require('passport-jwt').ExtractJwt;
const passport = require('passport');
const registerValidation = require('../registerValidator');
const loginValidation = require('../loginValidator');
require('dotenv').config();
const env = process.env;

const opts = {
  jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
  secretOrKey: env.SELECT_KEY,
  session: true,
  jsonwebtoken: {
    algorithm: 'HS256',
  },
};

passport.use(
  new JwtStrategy(opts, (jwt_payload, done) => {
    User.findOne(
      jwt_payload.email,
      jwt_payload.name,
      jwt_payload.password,
      (error, user) => {
        if (error) {
          return done(error, false);
        }
        if (user) {
          return done(null, user);
        } else {
          return done(null, false);
        }
      }
    );
  })
);

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
router.get('/post', auth, user.post);

module.exports = router;
