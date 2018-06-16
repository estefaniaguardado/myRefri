const passport = require('passport');
const router = require('express-promise-router')();

router.get('/login', (req, res) => {
  if (req.user) {
    res.redirect('/');
  } else {
    res.render('login', req.flash());
  }
});

router.post('/login', passport.authenticate('local', {
  successRedirect: '/',
  failureRedirect: '/login',
  failureFlash: true,
}));

router.get('/logout', (req, res) => {
  req.session.destroy(() => res.redirect('/'));
});


module.exports = router;
