import { createMockEnvironment, MockPayloadGenerator } from 'relay-test-utils';
import withProviders from '@//:modules/testing/withProviders';
import { render } from '@testing-library/react';
import Artists from '../Artists';
import ArtistsQuery from '@//:artifacts/ArtistsQuery.graphql';

it('should render artists when data is available', async () => {
  const Environment = createMockEnvironment();

  const variables = { data: { search: '' } };

  Environment.mock.queuePendingOperation(ArtistsQuery, variables);

  const resolver = {
    Artist: (_, generateId) => ({
      id: `artist-${generateId()}`,
      username: 'test',
      avatar: 'test-id',
    }),
  };

  // Set query to return our "fake" data
  Environment.mock.queueOperationResolver(operation =>
    MockPayloadGenerator.generate(operation, resolver),
  );

  const ArtistsComponent = () => {
    return (
      <Artists
        selected={[]}
        onSelect={() => {}}
        args={{ variables, options: {} }}
      />
    );
  };

  const Root = withProviders({
    Component: ArtistsComponent,
    routes: [],
    environment: Environment,
  });

  const { getByText } = render(<Root />);

  // expect that we are rendering artists correctly
  expect(getByText('test-test-id')).toBeVisible();
});
