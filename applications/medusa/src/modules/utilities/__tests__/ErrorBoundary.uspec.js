import { render, screen, waitFor } from '@testing-library/react';
import ErrorBoundary from '@//:modules/utilities/ErrorBoundary';
import userEvent from '@testing-library/user-event';

const Client = () => {
  throw new Error('error');
};

const Fallback = () => <>fallback</>;

// a helper fallback component that will display a fallback if reset was called
const Reset = ({ error, reset }) => {
  const onClick = () => {
    reset();
  };

  return <button onClick={onClick} />;
};

// helpers for suppressing errors in logging, since we expect errors to be thrown here
let expectedErrors = 0;
let actualErrors = 0;

function onError(e) {
  e.preventDefault();
  actualErrors++;
}

beforeEach(() => {
  expectedErrors = 0;
  actualErrors = 0;
  window.addEventListener('error', onError);
});

afterEach(() => {
  window.removeEventListener('error', onError);
  expect(actualErrors).toBe(expectedErrors);
  expectedErrors = 0;
});

it('should catch error when thrown', async () => {
  expectedErrors = 1;

  const Root = () => (
    <ErrorBoundary>
      <Client />
    </ErrorBoundary>
  );

  render(<Root />);

  // error thrown by our component
  await waitFor(() => expect(screen.getByText('Error: error')).toBeVisible());
});

it('should render fallback when error is thrown', async () => {
  expectedErrors = 1;

  const Root = () => (
    <ErrorBoundary fallback={Fallback}>
      <Client />
    </ErrorBoundary>
  );

  render(<Root />);

  // error thrown by our component
  await waitFor(() => expect(screen.getByText('fallback')).toBeVisible());
});

it('should reset error when pressed', async () => {
  expectedErrors = 2;

  const Root = () => (
    <ErrorBoundary fallback={Reset}>
      <Client />
    </ErrorBoundary>
  );

  render(<Root />);

  // reset
  const button = screen.getByRole('button');

  // error thrown by our component
  await waitFor(() => expect(button).toBeVisible());

  userEvent.click(button);

  // fallback will be visible, but this time the other state will be visible to indicate
  // that the reset actually occurred
  await waitFor(() => expect(button).toBeVisible());
});
