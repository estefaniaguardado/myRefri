const LocalStrategy = require('passport-local');
const passport = require('passport');

const userHandler = require('./userHandler');

// Note: Move if more strategies are added
passport.use(new LocalStrategy(async (username, password, done) => {
  try {
    const user = await userHandler.findUserByName(username);
    if (user.password !== password) throw new Error('ERROR_INVALID_PASSWORD');

    done(null, user);
  } catch (error) {
    done(null, false, error);
  }
}));


passport.serializeUser((user, done) => done(null, user.id));

passport.deserializeUser(async (id, done) => {
  try {
    const user = await userHandler.findUserById(id);
    done(null, user);
  } catch (error) {
    done(null, false, error);
  }
});
