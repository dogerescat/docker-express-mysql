const express = require('express');
const router = express.Router();
const like = require('../controller/like.controller');
const JwtStrategy = require('passport-jwt').Strategy;
const ExtractJwt = require('passport-jwt').ExtractJwt;
const passport = require('passport');
const User = require('../model/user');
const auth = require('../middleware/auth');
require('dotenv').config();
const env = process.env;

const opts = {
  jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
  secretOrKey: env.SELECT_KEY,
  session: false,
  jsonwebtoken: {
    algorithm: 'HS256',
    expiresIn: '1h',
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
        }
        return done(null, false);
      }
    );
  })
);

router.post(
  '/create/:id',
  auth,
  passport.authenticate('jwt', { session: false }),
  like.create
);
router.delete(
  '/delete/:id',
  auth,
  passport.authenticate('jwt', { session: false }),
  like.delete
);
module.exports = router;
