import { ChunkExtractor } from '@loadable/server';
import React from 'react';
import axios from 'axios';
import { Environment, Network, RecordSource, Store } from 'relay-runtime';
import createRouter from '@//:modules/routing/createRouter';
import routes from '../../client/routes';
import { getMockHistory } from '@//:modules/routing/createMockHistory';
import path from 'path';
import serialize from 'serialize-javascript';
import ssrPrepass from 'react-ssr-prepass';
import App from '../../client/App';

const entry = async (req, res, next) => {
  try {
    let forwardCookies = [];

    const csrfToken = req.csrfToken();

    let fetchCookies = null;

    // Make sure we include a csrf cookie in our fetchRelay function, since
    // the initial call does not contain it
    if (req.cookies._csrf === undefined) {
      if (req.headers.cookie !== undefined) {
        fetchCookies = `${req.headers.cookie},csrf=${req.csrf.csrfSecret}`;
      } else {
        fetchCookies = `_csrf=${req.csrf.csrfSecret}`;
      }
    }

    // TODO: add a _csrf cookie to the headers, if one doesn't exist
    async function fetchRelay(params, variables, _cacheConfig) {
      const response = await axios({
        url: 'http://hades:8000/graphql',
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'CSRF-Token': csrfToken,
          ...req.headers,
          cookie: fetchCookies !== null ? fetchCookies : req.headers.cookie,
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

    // Set up relay environment
    const environment = new Environment({
      network: Network.create(fetchRelay),
      store: new Store(new RecordSource(), {
        gcReleaseBufferSize: 10,
      }),
    });

    const context = {};

    const router = createRouter(
      routes,
      getMockHistory({ context, location: req.url }),
      environment,
    );

    // Set up our chunk extractor, so that we can preload our resources
    const extractor = new ChunkExtractor({
      statsFile: path.resolve(__dirname, 'loadable-stats.json'),
      entrypoints: ['client'],
    });

    // Load all data, and then we pass it to our HTML file as data.
    // Pages will load instantly for users without a "loading" screen, which makes for
    // a better experience. In the future, we can also preload any routes that we want to SSR
    await ssrPrepass(
      extractor.collectChunks(
        <App router={router} environment={environment} />,
      ),
    );

    // Get our relay store
    const relayData = environment
      .getStore()
      .getSource()
      .toJSON();

    // If no CSRF cookie exists, we set it
    if (req.cookies._csrf === undefined) {
      forwardCookies = [
        ...forwardCookies,
        `_csrf=${req.csrf.csrfSecret}; Path=/; HttpOnly; Secure`,
      ];
    }

    // Add any cookies that may have been added in our API requests, and headers from any possible middleware
    res.setHeader('set-cookie', forwardCookies);

    // Disable caching for this page - it MUST be regenerated with each request
    res.setHeader(
      'cache-control',
      'private, no-cache, no-store, must-revalidate',
    );

    if (context.url) {
      res.redirect(context.url);
    } else {
      res.render('default', {
        title: 'Title',
        scripts: extractor.getScriptTags(),
        preload: extractor.getLinkTags(),
        styles: extractor.getStyleTags(),
        csrfToken: csrfToken,
        relayStore: serialize(relayData),
      });
    }
  } catch (e) {
    next(e);
  }
};

export default entry;
