const path = require('path');
const express = require('express');
const flash = require('req-flash');
const passport = require('passport');
const debug = require('debug')('http');
const bodyParser = require('body-parser');
const session = require('express-session');
const cookieParser = require('cookie-parser');

const auth = require('./auth');
const routes = require('./routes');


const app = express();


app.set('view engine', 'pug');
app.set('views', path.join(__dirname, '/views'));

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(cookieParser());
app.use(session({ secret: 'keyboard cat', resave: false, saveUninitialized: false }));
app.use(flash());
app.use(passport.initialize());
app.use(passport.session());

app.use(auth);
app.use(routes);


app.listen(3000, () => {
  debug('App is listening in port 3000');
});
