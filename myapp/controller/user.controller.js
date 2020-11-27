const User = require('../model/user');
const jwt = require('jsonwebtoken');
const { validationResult } = require('express-validator');
require('dotenv').config();
const env = process.env;

module.exports = {
  register: (req, res) => {
    res.render('register.ejs', { error: '', info: null });
  },
  login: (req, res) => {
    res.render('login.ejs', { error: '', info: null });
  },
  create: (req, res) => {
    const results = validationResult(req);
    if (!results.isEmpty()) {
      res.render('register.ejs', { error: results.errors[0].msg, info: null });
      return;
    }
    User.createUser(req.body, (error, result) => {
      if (error) {
        console.log(error);
        res.redirect('/');
        return;
      }
      const payload = {
        name: req.body.name,
        email: req.body.email,
        password: req.body.password
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
  authentication: (req, res) => {
    const results = validationResult(req);
    if (!results.isEmpty()) {
      res.render('login.ejs', { error: results.errors[0].msg, info: null });
      return;
    }
    User.findUser(req.body.email, req.body.password, (error, result) => {
      if (result.length === 0) {
        res.redirect('/login');
        return;
      }
      const payload = {
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
  post: (req, res) => {
    res.setHeader('token', req.token);
    res.render('post.ejs', { info: req.decoded.name });
  },
};
