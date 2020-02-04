const { Router } = require('express');
const router = Router();
const checkToken = require('../middlewares/tokenChecking');
const noteValidate = require('../middlewares/noteValidate')

router.get('/', checkToken, require('./notes/getAll'));
router.get('/shared/:id', require('./notes/shared'));
router.post('/create', checkToken, noteValidate, require('./notes/create'));
router.put('/edit/:id', checkToken, noteValidate, require('./notes/edit'));
router.delete('/delete/:id', checkToken, require('./notes/delete'));

module.exports = router;