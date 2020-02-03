const { Router } = require('express');
const router = Router();

router.post('/login', require('./auth/login'));

router.post('/register', require('./auth/register'));

module.exports = router;