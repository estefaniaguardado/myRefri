const LocalStrategy = require('passport-local');
const passport = require('passport');

const userHandler = require('./userHandler');

// Note: Move if more strategies are added
/**
 * Load passport-level middleware to authenticate by LocalStrategy for username/password.
 * @function
 * @callback LocalStrategy - Authenticate if the given user already exists through LocalStrategy.
 * @param {String} username
 * @param {String} password
 * @param {} done - Verify callback and return user if found it.
 * @see {@link http://www.passportjs.org/} Passportjs
 */
passport.use(new LocalStrategy(async (username, password, done) => {
  try {
    const user = await userHandler.findUserByName(username);
    if (user.password !== password) throw new Error('ERROR_INVALID_PASSWORD');

    done(null, user);
  } catch (error) {
    done(null, false, error);
  }
}));

/**
 * Passport will serialize user instance to and from the session.
 * @function
 * @callback SerializeUser - The user ID is serialized to the session.
 * @param {JSON} user
 * @param {} done - Verify callback and return user.id, which will be restored in req.user.
 * @see {@link http://www.passportjs.org/docs/configure/} Passportjs
 */
passport.serializeUser((user, done) => done(null, user.id));

/**
 * Passport will deserialize user instance to and from the session.
 * @function
 * @callback DeserializeUserID - Deserialize the user ID to find the user.
 * @param {String} id
 * @param {} done - Verify callback and return user by user.id from req.user.
 * @see {@link http://www.passportjs.org/docs/configure/} Passportjs
 */
passport.deserializeUser(async (id, done) => {
  try {
    const user = await userHandler.findUserById(id);
    done(null, user);
  } catch (error) {
    done(null, false, error);
  }
});
