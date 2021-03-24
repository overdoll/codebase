import { createMockEnvironment, MockPayloadGenerator } from 'relay-test-utils';
import withProviders from '@//:modules/testing/withProviders';
import { render } from '@testing-library/react';
import { loadQuery } from 'react-relay/hooks';
import RootQuery from '@//:artifacts/RootQuery.graphql';
import Root from '../Root';

it('should render the root component children', async () => {
  const Environment = createMockEnvironment();

  Environment.mock.queuePendingOperation(RootQuery, {});

  const resolver = {
    Authentication: () => ({
      cookie: null,
      user: null,
    }),
  };

  // Set query to return our "fake" data
  Environment.mock.queueOperationResolver(operation =>
    MockPayloadGenerator.generate(operation, resolver),
  );

  const preparedQuery = loadQuery(
    Environment,
    RootQuery,
    {},
    {
      fetchPolicy: 'store-or-network',
    },
  );

  // Pass preload query data to root component
  const RootComponent = () => {
    return <Root prepared={{ stateQuery: preparedQuery }}>children</Root>;
  };

  const RootDefault = withProviders({
    Component: RootComponent,
    routes: [],
    environment: Environment,
  });

  const { getByText } = render(<RootDefault />);

  // make sure that the children of "root" are rendered
  expect(getByText('children')).toBeVisible();
});
