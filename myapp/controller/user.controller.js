const User = require('../model/user');
const jwt = require('jsonwebtoken');
const { validationResult } = require('express-validator');
const quesryString = require('querystring');

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
    } else {
      User.createUser(req.body, (error, result) => {
        if (error) {
          console.log(error);
          res.redirect('/');
        } else {
          const query = quesryString.stringify({
            name: req.body.name,
            email: req.body.email,
          });
          res.redirect('/post?' + query);
        }
      });
    }
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
      } else {
        const query = quesryString.stringify({
          name: result[0].name,
          email: result[0].email,
        });
        res.redirect('/post?' + query);
      }
    });
  },
  post: (req, res) => {
    if (!req.query.name || !req.query.email) {
      res.redirect('/login');
    } else {
      const query = req.query;
      const payload = {
        name: query.name,
        email: query.email,
      };
      const SELECT_KEY = 'select';
      const option = {
        algorithm: 'HS256',
        expiresIn: '1h',
      };
      const token = jwt.sign(payload, SELECT_KEY, option);
      res.setHeader('token', token);
      res.render('post.ejs', { info: query.name });
    }
  },
};
