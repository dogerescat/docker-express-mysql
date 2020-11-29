const User = require('../model/user');
const jwt = require('jsonwebtoken');
const { validationResult } = require('express-validator');
require('dotenv').config();
const env = process.env;

module.exports = {
  register: (req, res) => {
    res.render('register.ejs', { info: null });
  },
  login: (req, res) => {
    res.render('login.ejs', { info: null });
  },
  create: (req, res) => {
    const validationErrors = validationResult(req);
    if (!validationErrors.isEmpty()) {
      req.flash('errors', validationErrors.errors[0].msg);
      res.redirect('/');
      return;
    }
    User.createUser(req.body, (error, result) => {
      if (error) {
        res.redirect('/');
        return;
      }
      User.findUser(req.body.email, req.body.password, (err, results) => {
        if (err) {
          res.redirect('/login');
          return;
        }
        const payload = {
          id: results[0].id,
          name: results[0].name,
          email: results[0].email,
          password: results[0].password
        };
        const option = {
          algorithm: 'HS256',
          expiresIn: '1h',
        };
        const token = jwt.sign(payload, env.SELECT_KEY, option);
        req.session.accessToken = `Bearer ${token}`;
        res.redirect('/post');
      })
    });
  },
  authentication: (req, res) => {
    const validationerrors = validationResult(req);
    if (!validationerrors.isEmpty()) {
      req.flash('error', validationerrors.errors[0].msg)
      res.redirect('/login');
      return;
    }
    User.findUser(req.body.email, req.body.password, (error, result) => {
      if (result.length === 0) {
        res.redirect('/login');
        return;
      }
      const payload = {
        id: result[0].id,
        name: result[0].name,
        email: result[0].email,
        password: result[0].password
      };
      const option = {
        algorithm: 'HS256',
        expiresIn: '1h',
      };
      const token = jwt.sign(payload, env.SELECT_KEY, option);
      req.session.accessToken = `Bearer ${token}`
      res.redirect('/post');

    });
  },
  logout: (req, res) => {
    delete req.session.accessToken;
    res.redirect('/login');
  },

};
