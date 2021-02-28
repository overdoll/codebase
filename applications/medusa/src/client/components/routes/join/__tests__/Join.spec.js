import { createMockEnvironment, MockPayloadGenerator } from 'relay-test-utils';
import withProviders from '@//:modules/testing/withProviders';
import Join from '../Join';
import { fireEvent, render, waitFor } from '@testing-library/react';

it('Joining redirects to lobby', async () => {
  const Environment = createMockEnvironment();

  const Root = withProviders({
    Component: Join,
    routes: [],
    environment: Environment,
  });

  const { getByRole } = render(<Root />);

  const email = 'test-user@test.com';

  // Change input to have a username
  // we wait for input to be available (suspense needs to resolve first)
  const input = getByRole('textbox');
  fireEvent.change(input, { target: { value: email } });

  // Click our button
  const button = getByRole('button');
  fireEvent.click(button);

  // Wait for operation to resolve
  const mutationOperation = await waitFor(() =>
    Environment.mock.getMostRecentOperation(),
  );

  // Was called with the proper variables (same variable as username input)
  expect(mutationOperation.fragment.variables.data).toEqual({
    email: email,
  });

  const payload = {
    authenticate() {
      return true;
    },
  };

  // Resolve our operation - the join method was called
  await waitFor(() =>
    Environment.mock.resolveMostRecentOperation(operation =>
      MockPayloadGenerator.generate(operation, payload),
    ),
  );

  // Textbox element is gone - we were "redirected" (another component is shown)
  expect(input).not.toBeInTheDocument();
});
