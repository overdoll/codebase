import { createMockEnvironment, MockPayloadGenerator } from 'relay-test-utils';
import withProviders from '@//:modules/testing/withProviders';
import Join from '../Join';
import { render, waitFor, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

it('joining redirects to lobby, receives a response and asks to register', async () => {
  const Environment = createMockEnvironment();

  const [Root] = withProviders({
    Component: Join,
    routes: [],
    environment: Environment,
  });

  render(<Root />);

  const email = 'test-user@test.com';

  // Change input to have a username
  // we wait for input to be available (suspense needs to resolve first)
  const input = screen.getByRole('textbox');
  userEvent.type(input, email);

  // Click our button
  const button = screen.getByRole('button');
  userEvent.click(button);

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
    Environment.mock.resolveMostRecentOperation((operation) =>
      MockPayloadGenerator.generate(operation, payload),
    ),
  );

  // Textbox element is gone - we were "redirected" (another component is shown)
  expect(input).not.toBeInTheDocument();

  const operation = Environment.mock.getMostRecentOperation();

  // we got a response from authentication cookie
  await waitFor(() =>
    Environment.mock.nextValue(
      operation,
      MockPayloadGenerator.generate(operation, {
        AuthListener: () => ({
          sameSession: true,
          cookie: {
            registered: false,
          },
        }),
      }),
    ),
  );

  // expect to see a textbox to register username
  expect(screen.getByRole('textbox')).toHaveAttribute('name', 'username');
});
