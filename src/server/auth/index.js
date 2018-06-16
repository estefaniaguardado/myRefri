const passport = require('passport');
const router = require('express-promise-router')();
const LocalStrategy = require('passport-local');

const userHandler = require('../services/userHandler');

// Note: Move if more strategies are added
passport.use(new LocalStrategy(async (username, password, done) => {
  try {
    const user = await userHandler.findUserByName(username);
    if (user.password !== password) throw new Error('ERROR_INVALID_PASSSWORD');

    done(null, user);
  } catch (error) {
    done(error);
  }
}));


passport.serializeUser((user, done) => done(null, user.id));

passport.deserializeUser(async (id, done) => {
  try {
    const user = await userHandler.findUserById(id);
    done(null, user);
  } catch (error) {
    done(error);
  }
});


router.get('/logout', (req, res) => {
  req.session.destroy(() => res.redirect('/'));
});

router.get('/login', (req, res) => {
  if (req.user) {
    res.redirect('/');
  } else {
    res.render('login');
  }
});

router.post('/login', passport.authenticate('local', {
  successRedirect: '/',
  failureRedirect: '/login',
  failureFlash: true,
}));

function authorized(req, res, next) {
  if (!req.user) {
    res.redirect('/login');
  } else {
    next();
  }
}

module.exports = {
  router,
  authorized,
};
