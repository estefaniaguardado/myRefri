import path from 'path';
import express from 'express';
import { Request, Response, NextFunction } from 'express';
import expressFlash from 'express-flash';
import passport from 'passport';
import bodyParser from 'body-parser';
import session from 'express-session';
import cookieParser from 'cookie-parser';
import routes from './routes';
import DetailsError from './DetailsError';
import './services/auth';
import connectPgSession from 'connect-pg-simple';
import config from '../config';
import logger from './logger';

const log = logger('server');
const app = express();
const pgSession = connectPgSession(session);

app.set('view engine', 'pug');
app.set('views', path.join(__dirname, '/views'));

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(cookieParser());
app.use(session({
  store: new pgSession({
    conString: config('database'),
    schemaName: 'main',
    tableName: 'session',
  }),
  secret: 'keyboard cat',
  resave: false,
  saveUninitialized: true,
  cookie: { maxAge: 900000 },
}));
app.use(expressFlash());
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

const port = config('PORT');
app.listen(port, () => {
  log.info(`App is listening in port ${port}`);
});

export = app;
