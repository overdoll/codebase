import App from './App';
import express from 'express';
import RoutingContext from './routing/RoutingContext';
import createRouter from './routing/createRouter';
import routes from './routes';
import { getMockHistory } from './routing/createMockHistory';
import RelayEnvironment from './RelayEnvironment';
import { RelayEnvironmentProvider } from 'react-relay/hooks';
import ssrPrepass from 'react-ssr-prepass';

const chunks = require(process.env.RAZZLE_CHUNKS_MANIFEST);

const server = express();
server
  .disable('x-powered-by')
  .use(express.static('public'))
  .get('/*', async (req, res) => {
    const context = {};

    const router = createRouter(
      routes,
      getMockHistory({ context, location: req.url }),
    );

    const env = RelayEnvironment;

    await ssrPrepass(
      <RelayEnvironmentProvider environment={env}>
        <RoutingContext.Provider value={router.context}>
          <App />
        </RoutingContext.Provider>
      </RelayEnvironmentProvider>,
    );

    console.log(
      env
        .getStore()
        .getSource()
        .toJSON(),
    );

    //     ${chunks.client.css.map(
    //         path => `<link rel="stylesheet" href="${path}">`,
    //   )}
    // ${chunks.client.js.map(
    //   path => `<script src="${path}" defer crossorigin></script>`,
    // )}

    if (context.url) {
      res.redirect(context.url);
    } else {
      res.status(200).send(
        `<!doctype html>
    <html lang="">
    <head>
        <meta http-equiv="X-UA-Compatible" content="IE=edge" />
        <meta charset="utf-8" />
        <title>Welcome to Razzle</title>
        <meta name="viewport" content="width=device-width, initial-scale=1">
          
    </head>
    <body>
        <div id="root" />
    </body>
</html>`,
      );
    }
  });

export default server;
