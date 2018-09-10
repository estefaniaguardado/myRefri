const LocalStrategy = require('passport-local');
const passport = require('passport');

const userHandler = require('./userHandler');

/**
 * Authenticate if the given user already exists by the given username and password.
 * @param {string} username
 * @param {string} password
 * @param {Function} done - Callback and return user if found it.
 * @see {@link http://www.passportjs.org/} Passportjs
 */
async function validateUser(username:string, password: string, done: Function) {
  try {
    const user = await userHandler.findUserByName(username);
    if (user.password !== password) throw new Error('ERROR_INVALID_PASSWORD');

    done(null, user);
  } catch (error) {
    done(null, false, error);
  }
}

/**
 * Passport will serialize user instance to and from the session.
 * @param {JSON} user
 * @param {Function} done - Callback and return user.id, which will be restored in req.user.
 * @see {@link http://www.passportjs.org/docs/configure/} Passportjs
 */
function serialize(user: any, done: Function) {
  done(null, user.id);
}

/**
 * Passport will deserialize user instance to and from the session.
 * @param {string} id
 * @param {Function} done - Callback and return user by user.id from req.user.
 * @see {@link http://www.passportjs.org/docs/configure/} Passportjs
 */
async function deserialize(id: string, done: Function) {
  try {
    const user = await userHandler.findUserById(id);
    done(null, user);
  } catch (error) {
    done(null, false, error);
  }
}

// Note: Move if more strategies are added
passport.use(new LocalStrategy(validateUser));
passport.serializeUser(serialize);
passport.deserializeUser(deserialize);
