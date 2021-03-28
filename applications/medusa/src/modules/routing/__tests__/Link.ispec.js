import withProviders from '@//:modules/testing/withProviders';
import Link from '@//:modules/routing/Link';
import { render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import JSResource from '@//:modules/utilities/JSResource';
import { createMockEnvironment } from 'relay-test-utils';

// components to help with testing
const LinkComponent = () => {
  return <Link to="/test">test</Link>;
};

const Component = () => {
  return 'rendering component';
};

const Empty = {
  path: '*',
  component: JSResource(
    'LinkComponent',
    () => new Promise(resolve => resolve(LinkComponent)),
  ),
};

// tests link actions
it('clicking on the link directs to the route', async () => {
  const routes = [
    {
      path: '/test',
      exact: true,
      component: JSResource(
        'Component',
        () => new Promise(resolve => resolve(Component)),
      ),
    },
    Empty,
  ];

  const [Root] = withProviders({
    routes: routes,
  });

  render(<Root />);

  await waitFor(() => expect(screen.getByRole('link')).toBeInTheDocument());

  const link = screen.getByRole('link');

  userEvent.click(link);

  await waitFor(() =>
    expect(screen.getByText('rendering component')).toBeInTheDocument(),
  );
});

it('hovering over the link will preload the component', async () => {
  const func = jest.fn();

  const routes = [
    {
      path: '/test',
      exact: true,
      component: JSResource(
        'Component2',
        () =>
          new Promise(resolve => {
            func();
            resolve(Component);
          }),
      ),
    },
    Empty,
  ];

  const [Root] = withProviders({
    routes: routes,
  });

  render(<Root />);

  await waitFor(() => expect(screen.getByRole('link')).toBeInTheDocument());

  const link = screen.getByRole('link');

  userEvent.hover(link);

  await waitFor(() => expect(func).toHaveBeenCalled());
});

it('mouse down on the link will load code and data', async () => {
  const func = jest.fn();

  const Environment = createMockEnvironment();

  const RootQuery = require('@//:artifacts/RootQuery.graphql');

  const routes = [
    {
      path: '/test',
      exact: true,
      component: JSResource(
        'Component3',
        () =>
          new Promise(resolve => {
            func();
            resolve(Component);
          }),
      ),
      prepare: params => {
        return {
          stateQuery: {
            query: RootQuery,
            variables: {},
            options: {
              fetchPolicy: 'store-or-network',
            },
          },
        };
      },
    },
    Empty,
  ];

  const [Root] = withProviders({
    routes: routes,
    environment: Environment,
  });

  render(<Root />);

  await waitFor(() => expect(screen.getByRole('link')).toBeInTheDocument());

  const link = screen.getByRole('link');

  userEvent.click(link);

  await waitFor(() => expect(func).toHaveBeenCalled());

  // expect that relay has the current query in the store (preload function worked correctly)
  Environment.mock.findOperation(
    data => data.request.node.hash === RootQuery.hash,
  );
});
