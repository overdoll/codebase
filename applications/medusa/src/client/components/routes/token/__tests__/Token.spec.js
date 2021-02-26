import { createMockEnvironment, MockPayloadGenerator } from 'relay-test-utils';
import withProviders from '@//:modules/testing/withProviders';
import Token from '../Token';
import { fireEvent, render, waitFor } from '@testing-library/react';
import { loadQuery, graphql } from 'react-relay/hooks';

const queueOperation = resolver => {
  const Environment = createMockEnvironment();

  const TokenQuery = require('@//:artifacts/TokenQuery.graphql');

  const cookie = 'fake-token-123';

  Environment.mock.queuePendingOperation(TokenQuery, {
    cookie: cookie,
  });

  // Set query to return our "fake" data
  Environment.mock.queueOperationResolver(operation =>
    MockPayloadGenerator.generate(operation, resolver),
  );

  const preparedQuery = loadQuery(
    Environment,
    TokenQuery,
    {
      cookie: cookie,
    },
    {
      fetchPolicy: 'store-or-network',
    },
  );

  // Pass preload query data to token, since it originally resolves this from the router
  const TokenComponent = () => {
    return <Token prepared={{ tokenQuery: preparedQuery }} />;
  };

  return withProviders({
    Component: TokenComponent,
    routes: [],
    environment: Environment,
  });
};

it('should ask to register if not registered', async () => {
  const resolver = {
    Cookie: () => ({
      sameSession: true,
      registered: false,
      session: '',
    }),
  };

  const Root = queueOperation(resolver);

  const { getByRole } = render(<Root />);

  // If there is a button, we are at a registration screen
  expect(getByRole('textbox')).toBeVisible();
  expect(getByRole('button')).toBeVisible();
});

it('should show session data if token was redeemed in another session', async () => {
  const resolver = {
    Cookie: () => ({
      sameSession: false,
      registered: false,
      session: '{ "user-agent": "agent-session" }',
    }),
  };

  const Root = queueOperation(resolver);

  const { getByText } = render(<Root />);

  // Expect session data to be visible
  expect(getByText('agent-session')).toBeVisible();
});

it('should redirect if user is already registered', async () => {
  const resolver = {
    Cookie: () => ({
      sameSession: true,
      registered: true,
      session: '{ "user-agent": "agent-session" }',
    }),
  };

  const Root = queueOperation(resolver);

  const { getByText } = render(<Root />);

  // TODO: change this to check for a route change instead of a text change
  expect(getByText('redirecting')).toBeVisible();
});
