var express = require('express');
var router = express.Router();
const user = require('../controller/user.controller');
const User = require('../model/user');
const JwtStrategy = require('passport-jwt').Strategy;
const ExtractJwt = require('passport-jwt').ExtractJwt;
const passport = require('passport');
const registerValidation = require('../registerValidator');
const loginValidation = require('../loginValidator');

const SELECT_KEY = 'select';

const opts = {
  jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
  secretOrKey: SELECT_KEY,
  session: false,
  jsonwebtoken: {
    algorithm: 'HS256',
  },
};
passport.use(
  new JwtStrategy(opts, function (jwt_payload, done) {
    User.findOne(jwt_payload.email, jwt_payload.name, (error, user) => {
      if (error) {
        return done(error, false);
      }
      if (user) {
        return done(null, user);
      } else {
        return done(null, false);
      }
    });
  })
);

router.get('/', user.register);
router.post('/', registerValidation, user.create);
router.get('/login', user.login);
router.post('/login',loginValidation, user.authentication);
router.get('/post', user.post);

module.exports = router;
