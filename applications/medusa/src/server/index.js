import express from 'express';
import path from 'path';
import entry from './routes/entry';
import middleware from './middleware';

const index = express();

index.disable('x-powered-by');

// Set EJS templating
index
  .set('views', path.join(__dirname, '../src/server/templates'))
  .set('view engine', 'ejs');

// Add public routes
index.use(express.static(path.resolve(__dirname, '../public')));

index.use(middleware.helmet);

// Our entrypoint
index.get('/*', entry);

export default index;
