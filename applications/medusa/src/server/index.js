import express from 'express';
import path from 'path';
import entry from './routes/entry';
import middleware from './middleware';
import cookieParser from 'cookie-parser';
import csrf from 'csurf';

const index = express();

// Set EJS templating
index
  .set('views', path.join(__dirname, '../src/server/templates'))
  .set('view engine', 'ejs');

// Add public routes
index.use(express.static(path.resolve(__dirname, '../public')));

// helmet (security headers)
index.use(middleware.helmet);

// cookie-parser
index.use(cookieParser());

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
