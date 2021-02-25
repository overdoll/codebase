import { fireEvent, render, waitFor } from '@testing-library/react';
import Register from '../Register';
import withProviders from '@//:modules/testing/withProviders';
import { MockPayloadGenerator, createMockEnvironment } from 'relay-test-utils';

it('Register just works', async () => {
  const Root = withProviders({ Component: Register, routes: [] });
  const Environment = createMockEnvironment();

  const { getByRole, debug } = render(<Root />);

  const username = 'test-user';

  // Change input to have a username
  // we wait for input to be available (suspense needs to resolve first)
  const input = getByRole('textbox');
  fireEvent.change(input, { target: { value: username } });

  // Click our button
  const button = getByRole('button');
  fireEvent.click(button);

  await waitFor(() => expect(button).not.toBeDisabled());

  debug();

  // Add our mocks
  const customMockResolvers = {
    register: () => true,
  };

  // Environment.mock.resolveMostRecentOperation(operation =>
  //   MockPayloadGenerator.generate(operation, customMockResolvers),
  // );
  //
  // // Await for operation to resolve
  // await waitFor(() => Environment.mock.getMostRecentOperation());
  //
  const mutationOperation = Environment.mock.getMostRecentOperation();

  expect(mutationOperation.fragment.variables.input).toEqual({
    post: 'test',
  });
});
