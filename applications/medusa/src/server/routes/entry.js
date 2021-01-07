import { ChunkExtractor } from '@loadable/server';
import axios from 'axios';
import { Environment, Network, RecordSource, Store } from 'relay-runtime';
import createRouter from '@//:modules/routing/createRouter';
import routes from '../../client/routes';
import { getMockHistory } from '@//:modules/routing/createMockHistory';
import { RelayEnvironmentProvider } from 'react-relay/hooks';
import RoutingContext from '@//:modules/routing/RoutingContext';
import App from '../../client/App';
import path from 'path';
import serialize from 'serialize-javascript';
import ssrPrepass from 'react-ssr-prepass';

const entry = async (req, res, next) => {
  const context = {};

  const extractor = new ChunkExtractor({
    statsFile: path.resolve(__dirname, 'loadable-stats.json'),
    entrypoints: ['client'],
  });

  let forwardCookies = [];

  const csrfToken = req.csrfToken();

  let ssrCookies = [];

  // Make sure we capture our csrf cookie
  if (res.get('set-cookie') !== undefined) {
    ssrCookies = [...res.get('set-cookie')];
    forwardCookies = [...res.get('set-cookie')];
  }

  if (req.cookies._csrf !== undefined) {
    ssrCookies = [
      ...ssrCookies,
      `_csrf=${req.cookies._csrf}; Path=/; HttpOnly; Secure`,
    ];
  }

  async function fetchRelay(params, variables, _cacheConfig) {
    const response = await axios({
      url: 'http://hades:8000/graphql',
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'CSRF-Token': csrfToken,
        // for SSR, we can't really "set" cookies on the server, so we need to pass these, which our golang
        // middleware will check
        'csrf-cookies': [...ssrCookies],
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

    // TODO: handle the error properly (send to relay store somehow?) (new version of react-ssr-prepass fixes error boundaries?)
    // if (Array.isArray(response.data.errors)) {
    //   console.log(response.data.errors);
    //   throw new Error(
    //     `Error fetching GraphQL query '${
    //       params.name
    //     }' with variables '${JSON.stringify(variables)}': ${JSON.stringify(
    //       response.data.errors,
    //     )}`,
    //   );
    // }

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
  try {
    await ssrPrepass(
      extractor.collectChunks(
        <RelayEnvironmentProvider environment={environment}>
          <RoutingContext.Provider value={router.context}>
            <App />
          </RoutingContext.Provider>
        </RelayEnvironmentProvider>,
      ),
    );
  } catch (e) {
    // TODO: properly handle errors (show 500 page?)
    console.log(e);
    next();
    return;
  }

  // Get our relay store
  const relayData = environment
    .getStore()
    .getSource()
    .toJSON();

  // Add any cookies that may have been added in our API requests, and headers from any possible middleware
  res.setHeader('set-cookie', forwardCookies);

  if (context.url) {
    res.redirect(context.url);
  } else {
    res.render('default', {
      title: 'Title',
      description: 'Description',
      scripts: extractor.getScriptTags(),
      preload: extractor.getLinkTags(),
      styles: extractor.getStyleTags(),
      csrfToken: csrfToken,
      relayStore: serialize(relayData),
    });
  }
};

export default entry;
