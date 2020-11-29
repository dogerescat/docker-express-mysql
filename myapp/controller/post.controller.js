const Post = require('../model/post');
const User = require('../model/user');
const { validationResult } = require('express-validator');

module.exports = {
  get: (req, res) => {
    Post.get((error, postResult) => {
      if (error) {
        res.redirect('/post');
        return;
      }
      User.get((err, userResult) => {
        if (err) {
          res.redirect('/post');
          return;
        }
        res.setHeader('token', req.token);
        res.render('post.ejs', {
          info: req.decoded,
          posts: postResult,
          users: userResult,
        });
      });
    });
  },
  new: (req, res) => {
    res.render('new.ejs', { info: req.decoded });
  },
  edit: (req, res) => {
    Post.toEdit(req.params.id, (error, result) => {
      if (error) {
        res.redirect('/post');
        return;
      }
      res.render('edit.ejs', {
        info: req.decoded,
        id: result[0].id,
        title: result[0].title,
        contents: result[0].contents,
      });
    });
  },
  create: (req, res) => {
    const validationErrors = validationResult(req);
    if (!validationErrors.isEmpty()) {
      res.json(validationErrors.errors[0].msg);
      return;
    }
    Post.create(req.body, req.user[0].id, () => {
      res.json();
    });
  },
  update: (req, res) => {
    const validationErrors = validationResult(req);
    if (!validationErrors.isEmpty()) {
      res.json(validationErrors.errors[0].msg);
      return;
    }
    Post.update(req, () => {
      res.json();
    });
  },
};
