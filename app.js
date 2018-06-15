const express = require('express');

const bodyParser = require('body-parser');

const debug = require('debug')('http');

const passport = require('passport');

const LocalStrategy = require('passport-local');

const session = require('express-session');

const cookieParser = require('cookie-parser');

const ItemHandler = require('./ItemHandler');

const itemHandler = new ItemHandler();

const userHandler = require('./userHandler');

const flash = require('req-flash');

const app = express();

passport.use(new LocalStrategy({ passReqToCallback: true }, (username, password, done) => {
  userHandler.findUserByName({ username }, (err, user) => {
    if (err) return done(err);
    if (!user) return done(null, false, { message: 'Incorrect username' });
    if (user.password !== password) return done(null, false, { message: 'Incorrect Password' });
    return done(null, user);
  });
}));

passport.serializeUser((user, done) => done(null, user.id));

passport.deserializeUser((id, done) => {
  userHandler.findUserById(id, (err, user) => {
    if (err) return done(err);
    return done(null, user);
  });
});

app.set('view engine', 'pug');
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(cookieParser());
app.use(session({ secret: 'keyboard cat', resave: false, saveUninitialized: false }));
app.use(passport.initialize());
app.use(passport.session());
app.use(flash());

app.get('/', (req, res) => {
  res.render('home');
});

app.get('/login', (req, res) => {
  res.render('login');
});

app.get('/item', (req, res) => {
  res.render('index', { message: 'Hello World!', listOfItems: itemHandler.getList() });
});

app.post('/login', passport.authenticate('local', {
  successRedirect: '/login',
  failureRedirect: '/item',
  failureFlash: true,
}));

app.post('/item', (req, res) => {
  itemHandler.createNewItem(req.body);
  res.render('index', { message: 'Hello World!', listOfItems: itemHandler.getList() });
});

app.put('/item/:id', (req, res) => {
  itemHandler.modifyItem(req.params.id, req.body);

  if (req.accepts('application/json')) {
    return res.json({ ok: true });
  }

  return res.render('index', { message: 'Hello World!', listOfItems: itemHandler.getList() });
});

app.delete('/item/:id', (req, res) => {
  itemHandler.removeItemOfList(req.params.id);

  if (req.accepts('application/json')) {
    return res.json({ ok: true });
  }

  return res.render('index', { message: 'Hello World!', listOfItems: itemHandler.getList() });
});

app.listen(3000, () => {
  debug('App is listening in port 3000');
});
