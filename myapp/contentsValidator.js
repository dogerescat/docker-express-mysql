const { check } = require('express-validator');

module.exports = [
  check('title').not().isEmpty().withMessage('タイトルを入力してください'),
  check('contents').not().isEmpty().withMessage('本文を入力してください'),
  check('contents')
    .isLength({ max: 140 })
    .withMessage('本文は140文字以内で入力してください'),
];
