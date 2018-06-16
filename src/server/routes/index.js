const router = require('express-promise-router')();

const item = require('./item');


router.get('/', (req, res) => {
  if (req.user) {
    res.redirect('/item');
  } else {
    res.render('home');
  }
});

router.use('/item', item);


module.exports = router;
