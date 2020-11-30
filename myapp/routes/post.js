const express = require('express');
const router = express.Router();
const post = require('../controller/post.controller');
const JwtStrategy = require('passport-jwt').Strategy;
const ExtractJwt = require('passport-jwt').ExtractJwt;
const passport = require('passport');
const User = require('../model/user');
const contentsValidation = require('../contentsValidator');
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
        } else {
          return done(null, false);
        }
      }
    );
  })
);

router.get('/',auth, post.get);
router.get('/new', auth, post.new);
router.get('/edit/:id', auth, post.edit);
router.post('/create', auth, passport.authenticate('jwt', {session: false}), contentsValidation, post.create);
router.post('/update/:id', auth, passport.authenticate('jwt', {session: false}), contentsValidation, post.update);

module.exports = router;
