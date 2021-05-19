import { createMockEnvironment, MockPayloadGenerator } from 'relay-test-utils';
import withProviders from '@//:modules/testing/withProviders';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import Artists from '../Artists';
import ArtistsQuery from '@//:artifacts/ArtistsQuery.graphql';

it('should render artists when data is available', async () => {
  const Environment = createMockEnvironment();

  const variables = { data: { search: '' } };

  Environment.mock.queuePendingOperation(ArtistsQuery, variables);

  const resolver = {
    Artist: (context, generateId) => ({
      id: `artist-${generateId()}`,
      username: 'test',
      avatar: 'test-id',
    }),
  };

  // Set query to return our "fake" data
  Environment.mock.queueOperationResolver((operation) =>
    MockPayloadGenerator.generate(operation, resolver),
  );

  const onSelect = jest.fn();

  const ArtistsComponent = () => {
    return (
      <Artists
        selected={[]}
        onSelect={onSelect}
        args={{ variables, options: {} }}
      />
    );
  };

  const [Root] = withProviders({
    Component: ArtistsComponent,
    environment: Environment,
  });

  render(<Root />);

  const button = screen.getByRole('button');

  // expect that we are rendering artists correctly
  expect(screen.getByText('test-test-id')).toBeVisible();

  // click on the button to add an existing artist
  userEvent.click(button);

  // expect that the request went through
  expect(onSelect).toHaveBeenLastCalledWith({
    id: `artist-1`,
    username: 'test',
    avatar: 'test-id',
  });
});

it('should ask to add a new artist when none are available', async () => {
  const Environment = createMockEnvironment();

  const artistName = 'artist-example-name';

  const variables = { data: { search: artistName } };

  Environment.mock.queuePendingOperation(ArtistsQuery, variables);

  Environment.mock.queueOperationResolver((operation) => ({
    data: {
      artists: [],
    },
  }));

  const onSelect = jest.fn();

  const ArtistsComponent = () => {
    return (
      <Artists
        selected={[]}
        onSelect={onSelect}
        args={{ variables, options: {} }}
      />
    );
  };

  const [Root] = withProviders({
    Component: ArtistsComponent,
    environment: Environment,
  });

  render(<Root />);

  const button = screen.getByRole('button');

  // expect that we are asking to add a new artist with a button
  expect(button).toBeVisible();

  // click on the button to add a new artist
  userEvent.click(button);

  // expect that the request went through
  expect(onSelect).toHaveBeenLastCalledWith({
    id: null,
    username: artistName,
    avatar: null,
  });
});
