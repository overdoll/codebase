import express from 'express';
import path from 'path';
import entry from './routes/entry';
import middleware from './middleware';
import cookieParser from 'cookie-parser';
import csrf from 'csurf';
import i18nextMiddleware from 'i18next-http-middleware';
import i18next from './utilities/i18next';
import ejs from 'ejs';
import graphql from './routes/graphql';
import { matchQueryMiddleware } from 'relay-compiler-plus';
import queryMapJson from './queries.json';
import redis from 'redis';
import connect from 'connect-redis';
import session from 'express-session';
import sessionCfg from './config/session';

const index = express();

// Add public routes - build folder + public folder
index.use(express.static(path.resolve(__dirname, 'public')));
index.use(express.static(path.resolve(__dirname, '../public')));

// add EJS as the engine
index.engine('ejs', ejs.renderFile);

index.set('trust proxy', 1);

// Set EJS templating
index
  .set('views', path.join(__dirname, '../src/server/templates'))
  .set('view engine', 'ejs');

// Add i18next middleware
index.use(i18nextMiddleware.handle(i18next));

// cookie-parser
index.use(cookieParser(process.env.SESSION_SECRET));

// Generate a Nonce tag
index.use(middleware.nonce);

// helmet (security headers)
index.use(middleware.helmet);

const RedisStore = connect(session);

// Sessions
index.use(
  session({
    store: new RedisStore({
      client: redis.createClient({ host: process.env.REDIS_URL, db: 1 }),
    }),
    ...sessionCfg,
  }),
);

// CSRF
index.use(
  csrf({
    cookie: {
      secure: true,
      httpOnly: true,
      signed: true,
    },
  }),
);

// Flash sessions
index.use(middleware.flash());

// add coverage endpoint if in app_debug
if (process.env.APP_DEBUG) {
  index.get('/__coverage__', middleware.coverage);
}

// GraphQL Server
graphql({
  path: '/api/graphql',
  app: index.use(matchQueryMiddleware(queryMapJson)),
});

// Our entrypoint
index.get('/*', entry);

index.use(middleware.error);

export default index;
