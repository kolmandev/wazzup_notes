const { Router } = require('express');
const router = Router();
const { loginPassValidate } = require('../middlewares/loginPassValidate');
const checkToken = require('../middlewares/tokenChecking')

router.post('/login', loginPassValidate, require('./auth/login'));
router.post('/register', loginPassValidate, require('./auth/register'));
router.get('/logout', checkToken, require('./auth/logout'));

module.exports = router;