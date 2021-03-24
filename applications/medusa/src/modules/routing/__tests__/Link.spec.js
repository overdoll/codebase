import { createMockEnvironment } from 'relay-test-utils';
import withProviders from '@//:modules/testing/withProviders';
import Link from '@//:modules/routing/Link';
import { render } from '@testing-library/react';

it('joining redirects to lobby, receives a response and asks to register', async () => {
  const Component = () => {
    return <Link to="/test">test</Link>;
  };

  const [Root, router] = withProviders({
    Component: Component,
    routes: [],
  });

  const { getByRole } = render(<Root />);
});
