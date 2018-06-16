const router = require('express-promise-router')();

const item = require('./item');


router.get('/', (req, res) => res.render('home'));
router.use('/item', item);


module.exports = router;
