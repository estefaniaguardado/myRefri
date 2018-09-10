import path from 'path';
import express from 'express';
import { Request, Response, NextFunction } from 'express';
import flash from 'express-flash';
import passport from 'passport';
import debug from 'debug';

const http = debug('http');

import bodyParser from 'body-parser';
import session from 'express-session';
import cookieParser from 'cookie-parser';
import routes from './routes';
import DetailsError from './DetailsError';
import './services/auth';

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
app.use('/static', express.static(path.join(__dirname, '../client')));
app.use((error: DetailsError, req: Request, res: Response, next: NextFunction) => {
  res.status(error.statusCode || 500);

  if (req.accepts('text/html')) {
    return res.render('error', { error });
  } else if (req.accepts('application/json')) {
    return res.json({
      ...error,
      name: error.message,
    });
  }

  return next(error);
});

const port = process.env.PORT || 3000;
app.listen(port, () => {
  debug(`App is listening in port ${port}`);
});

module.exports = app;
