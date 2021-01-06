import App from '../client/App';
import express from 'express';
import RoutingContext from '@//:modules/routing/RoutingContext';
import createRouter from '@//:modules/routing/createRouter';
import routes from '../client/routes';
import { getMockHistory } from '@//:modules/routing/createMockHistory';
import { RelayEnvironmentProvider } from 'react-relay/hooks';
import { ChunkExtractor, ChunkExtractorManager } from '@loadable/server';
import serialize from 'serialize-javascript';
import ssrPrepass from 'react-ssr-prepass';
import path from 'path';
import { Environment, Network, RecordSource, Store } from 'relay-runtime';
import axios from 'axios';
import fs from 'fs';

const assets = require(process.env.RAZZLE_ASSETS_MANIFEST);

const chunks = require(process.env.RAZZLE_CHUNKS_MANIFEST);

const index = express();
index
  .disable('x-powered-by')
  .use(express.static(path.resolve(__dirname, '../public')))
  .get('/*', async (req, res) => {
    const context = {};

    const extractor = new ChunkExtractor({
      statsFile: path.resolve(__dirname, 'loadable-stats.json'),
      entrypoints: ['client'],
    });

    let forwardCookies = [];

    async function fetchRelay(params, variables, _cacheConfig) {
      const response = await axios({
        url: 'http://hades:8000/graphql',
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          ...req.headers,
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

      // Need to make sure we forward our cookies from API calls
      if (response.headers.hasOwnProperty('set-cookie')) {
        forwardCookies = [...forwardCookies, ...response.headers['set-cookie']];
      }

      return response.data;
    }

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
      <ChunkExtractorManager extractor={extractor}>
        <RelayEnvironmentProvider environment={environment}>
          <RoutingContext.Provider value={router.context}>
            <App />
          </RoutingContext.Provider>
        </RelayEnvironmentProvider>
      </ChunkExtractorManager>,
    );

    // collect script tags
    const scriptTags = extractor.getScriptTags();

    // collect "preload/prefetch" links
    const linkTags = extractor.getLinkTags();

    // collect style tags
    const styleTags = extractor.getStyleTags();

    const relayData = environment
      .getStore()
      .getSource()
      .toJSON();

    res.setHeader('set-cookie', [...forwardCookies]);

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
        ${linkTags}
        ${styleTags}
    </head>
    <body>
        <div id="root" />
        <script type="application/json" id="relay-store">
          ${serialize(relayData)}
        </script>
        ${scriptTags}
    </body>
</html>`,
      );
    }
  });

export default index;
