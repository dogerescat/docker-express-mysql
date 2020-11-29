const express = require('express');
const router = express.Router();
const jwt = require('jsonwebtoken');
const post = require('../controller/post.controller');
const JwtStrategy = require('passport-jwt').Strategy;
const ExtractJwt = require('passport-jwt').ExtractJwt;
const passport = require('passport');
const User = require('../model/user');
const contentsValidation = require('../contentsValidator');

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

router.get('/',auth, post.get);
router.get('/new', auth, post.new);
router.get('/edit/:id', auth, post.edit);
router.post('/create', passport.authenticate('jwt', {session: false}), contentsValidation, post.create);
router.post('/update/:id', passport.authenticate('jwt', {session: false}), contentsValidation, post.update);

module.exports = router;
