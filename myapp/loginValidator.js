const { check } = require('express-validator');

module.exports = [
  check('email').isEmail().withMessage('Eメールアドレスを入力してください'),
  check('password').not().isEmpty().withMessage('passwordを入力してください')
];
