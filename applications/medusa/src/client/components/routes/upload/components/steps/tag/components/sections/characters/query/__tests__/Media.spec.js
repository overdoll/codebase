import { createMockEnvironment, MockPayloadGenerator } from 'relay-test-utils';
import withProviders from '@//:modules/testing/withProviders';
import { fireEvent, render } from '@testing-library/react';
import MediaQuery from '@//:artifacts/MediaQuery.graphql';
import Media from '../Media';

it('should render media when data is available', async () => {
  const Environment = createMockEnvironment();

  const variables = { data: { search: '' } };

  Environment.mock.queuePendingOperation(MediaQuery, variables);

  const resolver = {
    Media: (context, generateId) => ({
      id: `media-${generateId()}`,
      title: 'test',
      thumbnail: 'thumbnail',
    }),
  };

  // Set query to return our "fake" data
  Environment.mock.queueOperationResolver(operation =>
    MockPayloadGenerator.generate(operation, resolver),
  );

  const onSelect = jest.fn();

  const MediaComponent = () => {
    return (
      <Media
        selected={[]}
        onSelect={onSelect}
        args={{ variables, options: {} }}
      />
    );
  };

  const [Root] = withProviders({
    Component: MediaComponent,
    environment: Environment,
  });

  const { getByText, getByRole } = render(<Root />);

  const button = getByRole('button');

  // expect that we are rendering characters correctly
  expect(getByText('test-media-1-thumbnail')).toBeVisible();

  // click on the button to add an existing artist
  fireEvent.click(button);

  // expect that the request went through
  expect(onSelect).toHaveBeenLastCalledWith({
    id: `media-1`,
    title: 'test',
    thumbnail: 'thumbnail',
  });
});

it('should ask to add a new media when none are available', async () => {
  const Environment = createMockEnvironment();

  const mediaName = 'media-example-name';

  const variables = { data: { search: mediaName } };

  Environment.mock.queuePendingOperation(MediaQuery, variables);

  Environment.mock.queueOperationResolver(operation => ({
    data: {
      media: [],
    },
  }));

  const onSelect = jest.fn();

  const MediaComponent = () => {
    return (
      <Media
        selected={[]}
        onSelect={onSelect}
        args={{ variables, options: {} }}
      />
    );
  };

  const [Root] = withProviders({
    Component: MediaComponent,
    environment: Environment,
  });

  const { getByRole } = render(<Root />);

  const button = getByRole('button');

  // expect that we are asking to add a new media with a button
  expect(button).toBeVisible();

  // click on the button to add a new artist
  fireEvent.click(button);

  // expect that the request went through
  expect(onSelect).toHaveBeenLastCalledWith({
    id: mediaName,
    title: mediaName,
    thumbnail: null,
    request: true,
  });
});
