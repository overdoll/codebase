import { ApolloGateway, RemoteGraphQLDataSource } from '@apollo/gateway';
import { ApolloServer } from 'apollo-server-express';
import parseCookies from '../utilities/parseCookies';

// https://github.com/apollographql/apollo-server/issues/3099#issuecomment-671127608 (slightly modified)
// Forwards cookies from services to our gateway (we place implicit trust on our services that they will use headers in a proper manner)
class CookieDataSource extends RemoteGraphQLDataSource {
  /**
   * Processes set-cookie headers from the service back to the
   * client, so the cookies are set within their browser
   */
  async process({ request, context }) {
    const response = await super.process({ request, context });

    const cookie = response.http?.headers.get('set-cookie');

    if (cookie) {
      const cookies = parseCookies(cookie);
      cookies.forEach(({ cookieName, cookieValue, options }) => {
        if (context && context.res) {
          context.res.cookie(cookieName, cookieValue, options);
        }
      });
    }

    return response;
  }

  /**
   * Sends any cookies found within the clients request headers then
   * pushes them to the requested services context
   */
  willSendRequest(requestContext) {
    if (!requestContext.context.req) {
      return;
    }

    if (requestContext.context.req.headers.cookie) {
      requestContext.request.http?.headers.set(
        'cookie',
        requestContext.context.req.headers.cookie,
      );
    }
  }
}

export default config => {
  const gateway = new ApolloGateway({
    path: config.path,
    serviceList: [
      { name: 'eva', url: 'http://eva:8000/graphql' },
      { name: 'sting', url: 'http://sting:8000/graphql' },
    ],
    persistedQueries: true,
    buildService({ url }) {
      return new CookieDataSource({ url });
    },
  });

  // GraphQL Server
  const server = new ApolloServer({
    gateway,
    subscriptions: false,
    context: ({ res, req }) => ({ res, req }),
  });

  server.start().then(r => server.applyMiddleware(config));
};
