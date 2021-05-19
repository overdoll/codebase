import JSResource from '@//:modules/utilities/JSResource';
import withProviders from '@//:modules/testing/withProviders';
import { render, waitFor } from '@testing-library/react';

// tests createRouter middleware
it('changes history when middleware is called', async () => {
  return;
  // TODO: was changed - middleware is now only ran with the createServerRouter
  const routes = [
    {
      path: '/route',
      exact: true,
      component: JSResource(
        'Component4',
        () =>
          new Promise((resolve) => {
            resolve(() => '');
          }),
      ),
      middleware: [
        (environment, history) => {
          // middleware will redirect to another route
          history.push('/another-route');
          return true;
        },
      ],
    },
  ];

  const [Root, router] = withProviders({
    routes: routes,
    initialEntries: ['/route'],
  });

  render(<Root />);

  // was redirected to another route
  await waitFor(() =>
    expect(router.context.history.location.pathname).toEqual('/another-route'),
  );
});
