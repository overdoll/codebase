import { render, screen, waitFor } from '@testing-library/react';
import Notification from '../Notification';
import userEvent from '@testing-library/user-event';
import { NotificationContext } from '@//:modules/focus/notification/provider/NotificationProvider';

it('notification displays success and dismisses', async () => {
  const onExpire = jest.fn();

  render(
    <NotificationContext.Provider value={{ onExpire }}>
      <Notification type="success" duration={null} id={1}>
        success
      </Notification>
    </NotificationContext.Provider>,
  );

  expect(screen.getByText('success')).toBeVisible();

  const button = screen.getByTestId('close');

  expect(button).toBeVisible();

  // click the dismiss button
  userEvent.click(button);

  // expect the provider's onExpire method to be called
  await waitFor(() => expect(onExpire).toHaveBeenLastCalledWith(1));
});

it('notification dismisses after a certain amount of time', async () => {
  const onExpire = jest.fn();

  jest.useFakeTimers();

  render(
    <NotificationContext.Provider value={{ onExpire }}>
      <Notification type="success" duration={500} id={1}>
        success
      </Notification>
    </NotificationContext.Provider>,
  );

  await waitFor(() => jest.runOnlyPendingTimers());

  // expect the provider's onExpire method to be called
  await waitFor(() => expect(onExpire).toHaveBeenLastCalledWith(1));
});

it('notification displays error', async () => {
  render(
    <Notification type="error" duration={null} id={1}>
      error
    </Notification>,
  );

  expect(screen.getByText('error')).toBeVisible();
});

it('notification displays warning', async () => {
  render(
    <Notification type="warning" duration={null} id={1}>
      warning
    </Notification>,
  );

  expect(screen.getByText('warning')).toBeVisible();
});
