import { fireEvent, render, waitFor } from '@testing-library/react';
import Register from '../Register';
import withProviders from '@//:modules/testing/withProviders';
import { createMockEnvironment } from 'relay-test-utils';

it('Register just works', async () => {
  const Environment = createMockEnvironment();

  const Root = withProviders({
    Component: Register,
    routes: [],
    environment: Environment,
  });

  const { getByRole } = render(<Root />);

  const username = 'test-user';

  // Change input to have a username
  // we wait for input to be available (suspense needs to resolve first)
  const input = getByRole('textbox');
  fireEvent.change(input, { target: { value: username } });

  // Click our button
  const button = getByRole('button');
  fireEvent.click(button);

  // Wait for operation to resolve
  const mutationOperation = await waitFor(() =>
    Environment.mock.getMostRecentOperation(),
  );

  // Was called with the proper variables (same variable as username input)
  expect(mutationOperation.fragment.variables.data).toEqual({
    username: username,
  });
});
