import express from 'express';
import path from 'path';
import entry from './routes/entry';
import middleware from './middleware';
import cookieParser from 'cookie-parser';
import csrf from 'csurf';
import i18nextMiddleware from 'i18next-http-middleware';
import i18next from './utilities/i18next';
import ejs from 'ejs';
import { ApolloServer } from 'apollo-server-express';
import { ApolloGateway } from '@apollo/gateway';
import graphql from './config/graphql';
import { matchQueryMiddleware } from 'relay-compiler-plus';
import queryMapJson from './queries.json';
import redis from 'redis';
import Connect from 'connect-redis';
import session from 'express-session';
import sessionCfg from './config/session';

const index = express();

// add EJS as the engine
index.engine('ejs', ejs.renderFile);

// Set EJS templating
index
  .set('views', path.join(__dirname, '../src/server/templates'))
  .set('view engine', 'ejs');

// Add public routes
// when in production, use the build directory's "public" folder since it has everything already in our "public" folder
process.env.NODE_ENV === 'production'
  ? index.use(express.static(path.resolve(__dirname, '../build/public')))
  : index.use(express.static(path.resolve(__dirname, '../public')));

// Add i18next middleware
index.use(i18nextMiddleware.handle(i18next));

// cookie-parser
index.use(cookieParser());

// Generate a Nonce tag
index.use(middleware.nonce);

// helmet (security headers)
index.use(middleware.helmet);

// CSRF
index.use(
  csrf({
    cookie: true,
    sessionKey: 'csrf',
  }),
);

// Sessions
index.use(
  session({
    store: new Connect(session)({ client: redis.createClient() }),
    ...sessionCfg,
  }),
);

// add coverage endpoint if in app_debug
if (process.env.APP_DEBUG) {
  index.get('/__coverage__', middleware.coverage);
}

const gateway = new ApolloGateway(graphql);

// GraphQL Server
const server = new ApolloServer({
  gateway,
  subscriptions: false,
});

server.start().then(r =>
  server.applyMiddleware({
    app: index.use(matchQueryMiddleware(queryMapJson)).use(middleware.passport),
  }),
);

// Our entrypoint
index.get('/*', entry);

index.use(middleware.error);

export default index;
