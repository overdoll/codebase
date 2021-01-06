import App from '../client/App';
import express from 'express';
import RoutingContext from '../client/routing/RoutingContext';
import createRouter from '../client/routing/createRouter';
import routes from '../client/routes';
import { getMockHistory } from '../client/routing/createMockHistory';
import { RelayEnvironmentProvider } from 'react-relay/hooks';
import serialize from 'serialize-javascript';
import ssrPrepass from 'react-ssr-prepass';
import path from 'path';
import { Environment, Network, RecordSource, Store } from 'relay-runtime';
import axios from 'axios';

const assets = require(process.env.RAZZLE_ASSETS_MANIFEST);

const chunks = require(process.env.RAZZLE_CHUNKS_MANIFEST);

async function fetchRelay(params, variables, _cacheConfig) {
  const response = await axios({
    url: 'http://hades:8000/graphql',
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    data: {
      query: 'empty',
      operationName: params.name,
      extensions: {
        apq: {
          hash: params.id,
        },
      },
      variables,
    },
  });

  return response.data;
}

const index = express();
index
  .disable('x-powered-by')
  .use(express.static(path.resolve(__dirname, '../public')))
  .use(express.static(process.env.RAZZLE_PUBLIC_DIR))
  .get('/*', async (req, res) => {
    const context = {};

    const environment = new Environment({
      network: Network.create(fetchRelay),
      store: new Store(new RecordSource(), {
        gcReleaseBufferSize: 10,
      }),
    });

    const router = createRouter(
      routes,
      getMockHistory({ context, location: req.url }),
      environment,
    );

    // Prepass
    // Load all data, and then we pass it to our HTML file as data
    // pages will load instantly for users without a "loading" screen, which makes for
    // a better experience. In the future, we can also preload any routes that we want to SSR
    await ssrPrepass(
      <RelayEnvironmentProvider environment={environment}>
        <RoutingContext.Provider value={router.context}>
          <App />
        </RoutingContext.Provider>
      </RelayEnvironmentProvider>,
    );

    const relayData = environment
      .getStore()
      .getSource()
      .toJSON();

    if (context.url) {
      res.redirect(context.url);
    } else {
      res.send(
        `<!doctype html>
    <html lang="">
    <head>
        <meta http-equiv="X-UA-Compatible" content="IE=edge" />
        <meta charSet='utf-8' />
        <title>Welcome to Razzle</title>
        <meta name="viewport" content="width=device-width, initial-scale=1">
        <script type="application/json" id="relay-store">
          ${serialize(relayData)}
        </script>
        ${
          assets.client.css
            ? `<link rel="stylesheet" href="${assets.client.css}">`
            : ''
        }
        ${
          process.env.NODE_ENV === 'production'
            ? `<script src="${assets.client.js}" defer></script>`
            : `<script src="${assets.client.js}" defer crossorigin></script>`
        }
    </head>
    <body>
    
        <div id="root" />
    </body>
</html>`,
      );
    }
  });

export default index;
