const router = require('express-promise-router')();

const item = require('./item');
const { authorized } = require('../auth');

router.get('/', (req, res) => {
  if (req.user) {
    res.redirect('/item');
  } else {
    res.render('home');
  }
});

router.use('/item', authorized, item);


module.exports = router;
