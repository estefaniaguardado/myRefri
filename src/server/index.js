const path = require('path');
const express = require('express');
const flash = require('req-flash');
const passport = require('passport');
const debug = require('debug')('http');
const bodyParser = require('body-parser');
const session = require('express-session');
const cookieParser = require('cookie-parser');

require('./services/auth');
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

app.use(routes);
app.use('/static', express.static(path.join(__dirname, '/public')));
app.use((error, req, res, next) => {
  res.status(error.statusCode || 500);

  if (req.accepts('text/html')) {
    return res.render('error', { error });
  } else if (req.accepts('application/json')) {
    return res.json(error);
  }

  return next();
});

const port = process.env.PORT || 3000;
app.listen(port, () => {
  debug(`App is listening in port ${port}`);
});

module.exports = app;
