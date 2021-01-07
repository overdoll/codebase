import express from 'express';
import path from 'path';
import entry from './routes/entry';
import middleware from './middleware';
import cookieParser from 'cookie-parser';
import csrf from 'csurf';

const index = express();

index.disable('x-powered-by');

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

// CSRF
index.use(
  csrf({
    cookie: { signed: false, secure: true, httpOnly: true },
  }),
);

// Our entrypoint
index.get('/*', entry);

export default index;
