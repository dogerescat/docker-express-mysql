const { check } = require('express-validator');

module.exports = [
  check('name').not().isEmpty().withMessage('名前を入力してください'),
  check('email').isEmail().withMessage('Eメールアドレスを入力してください'),
  check('password')
    .isLength({ min: 7 })
    .withMessage('パスワードは７文字以上に設定してください'),
  check('confirm').custom((value, { req }) => {
    if (value !== req.body.password) {
      throw new Error('確認用パスワードが一致しません');
    } else {
      return true;
    }
  }),
];
