import withProviders from '@//:modules/testing/withProviders';
import { render, waitFor } from '@testing-library/react';
import JSResource from '@//:modules/utilities/JSResource';

it('renders a root component with children', async () => {
  const routes = [
    {
      component: JSResource(
        'Root',
        () =>
          new Promise(resolve =>
            resolve(props => <div>test1{props.children}</div>),
          ),
      ),
      routes: [
        {
          path: '/test',
          exact: true,
          component: JSResource(
            'JoinRoot',
            () => new Promise(resolve => resolve(() => <div>test2</div>)),
          ),
        },
      ],
    },
  ];

  const [Root] = withProviders({
    routes: routes,
    initialEntries: ['/test'],
  });

  const { getByText, debug } = render(<Root />);

  await waitFor(() => expect(getByText('test1')).toBeInTheDocument());
  await waitFor(() => expect(getByText('test2')).toBeInTheDocument());
});
