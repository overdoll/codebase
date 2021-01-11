import express from 'express';
import path from 'path';
import entry from './routes/entry';
import middleware from './middleware';
import cookieParser from 'cookie-parser';
import csrf from 'csurf';
import i18nextMiddleware from 'i18next-http-middleware';
import i18next from './utilities/i18next';

const index = express();

// Set EJS templating
index
  .set('views', path.join(__dirname, '../src/server/templates'))
  .set('view engine', 'ejs');

// Add public routes
index.use(express.static(path.resolve(__dirname, '../public')));

// Add i18next middleware
index.use(i18nextMiddleware.handle(i18next));

// helmet (security headers)
index.use(middleware.helmet);

// cookie-parser
index.use(cookieParser());

// custom middleware to inject a csrf secret into the session -
// the default csurf middleware expects some sort of session storage but
// we also want access to the secret so we can send it on the SSR side
index.use((req, res, next) => {
  req.csrf = {};

  if (req.cookies._csrf !== undefined) {
    req.csrf.csrfSecret = req.cookies._csrf;
  }

  next();
});

// CSRF
index.use(
  csrf({
    cookie: false,
    sessionKey: 'csrf',
  }),
);

// Our entrypoint
index.get('/*', entry);

index.use(middleware.error);

export default index;
