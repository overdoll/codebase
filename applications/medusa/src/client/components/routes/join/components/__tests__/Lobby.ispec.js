import { render, screen, waitFor } from '@testing-library/react';
import { createMockEnvironment, MockPayloadGenerator } from 'relay-test-utils';
import withProviders from '@//:modules/testing/withProviders';
import Lobby from '../Lobby';

it('should run the parent function when subscription completes with desired results', async () => {
  const Environment = createMockEnvironment();

  const onReceiveMock = jest.fn();

  const email = 'test@test.com';

  const LobbyComponent = () => (
    <Lobby email={email} onReceive={onReceiveMock} />
  );

  const [Root] = withProviders({
    Component: LobbyComponent,
    routes: [],
    environment: Environment,
  });

  render(<Root />);

  // Expect that our user sees their own "email"
  expect(screen.getByText(email)).toBeVisible();

  const payload = {
    AuthListener: () => ({ sameSession: false }),
    Cookie: () => ({
      registered: false,
    }),
  };

  // Resolve our subscription with our new payload
  await waitFor(() =>
    Environment.mock.resolveMostRecentOperation(operation =>
      MockPayloadGenerator.generate(operation, payload),
    ),
  );

  // Expect that our onReceive function was called, when the user is not in the same session or registered
  expect(onReceiveMock).toHaveBeenCalledTimes(1);
});
