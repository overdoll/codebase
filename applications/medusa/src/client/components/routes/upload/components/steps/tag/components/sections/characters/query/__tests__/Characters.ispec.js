import { createMockEnvironment, MockPayloadGenerator } from 'relay-test-utils';
import withProviders from '@//:modules/testing/withProviders';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import CharactersQuery from '@//:artifacts/CharactersQuery.graphql';
import Characters from '../Characters';

it('should render characters when data is available', async () => {
  const Environment = createMockEnvironment();

  const variables = { data: { search: '' } };

  Environment.mock.queuePendingOperation(CharactersQuery, variables);

  const resolver = {
    Character: (context, generateId) => ({
      id: `character-${generateId()}`,
      name: 'test',
      thumbnail: 'thumbnail',
      media: {
        id: 'media-1',
        title: 'title',
        thumbnail: 'thumbnail',
      },
    }),
  };

  // Set query to return our "fake" data
  Environment.mock.queueOperationResolver(operation =>
    MockPayloadGenerator.generate(operation, resolver),
  );

  const onSelect = jest.fn();

  const CharactersComponent = () => {
    return (
      <Characters
        selected={[]}
        onSelect={onSelect}
        args={{ variables, options: {} }}
      />
    );
  };

  const [Root] = withProviders({
    Component: CharactersComponent,
    environment: Environment,
  });

  render(<Root />);

  const button = screen.getByRole('button');

  // expect that we are rendering characters correctly
  expect(
    screen.getByText('test-thumbnailtitle-media-1-thumbnail'),
  ).toBeVisible();

  // click on the button to add an existing artist
  userEvent.click(button);

  // expect that the request went through
  expect(onSelect).toHaveBeenLastCalledWith({
    id: 'character-1',
    name: 'test',
    thumbnail: 'thumbnail',
    media: {
      id: 'media-1',
      title: 'title',
      thumbnail: 'thumbnail',
    },
  });
});

it('should ask to add a new character when none are available', async () => {
  const Environment = createMockEnvironment();

  const characterName = 'character-example-name';

  const variables = { data: { search: characterName } };

  Environment.mock.queuePendingOperation(CharactersQuery, variables);

  Environment.mock.queueOperationResolver(operation => ({
    data: {
      characters: [],
    },
  }));

  const onSelect = jest.fn();

  const CharactersComponent = () => {
    return (
      <Characters
        selected={[]}
        onSelect={onSelect}
        args={{ variables, options: {} }}
      />
    );
  };

  const [Root] = withProviders({
    Component: CharactersComponent,
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
    id: characterName,
    name: characterName,
    thumbnail: null,
    media: null,
    request: true,
  });
});
