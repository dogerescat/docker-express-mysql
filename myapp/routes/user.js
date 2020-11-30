const express = require('express');
const router = express.Router();
const user = require('../controller/user.controller');
const registerValidation = require('../registerValidator');
const loginValidation = require('../loginValidator');
const auth = require('../middleware/auth');

router.get('/', user.register);
router.post('/', registerValidation, user.create);
router.get('/login', user.login);
router.post('/login', loginValidation, user.authentication);
router.get('/logout', auth, user.logout);

module.exports = router;
