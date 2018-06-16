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
  if (req.user) {
    res.redirect('/item');
  } else {
    res.render('login');
  }
});

app.get('/item', (req, res) => {
  if (!req.user) {
    res.redirect('/login');
  } else {
    res.render('index', { message: 'Hello World!', listOfItems: itemHandler.getList() });
  }
});

app.get('/logout', (req, res) => {
  req.session.destroy(() => res.redirect('/'));
});

app.post('/login', passport.authenticate('local', {
  successRedirect: '/item',
  failureRedirect: '/login',
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
