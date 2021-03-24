import { fireEvent, render, waitFor } from '@testing-library/react';
import Notification from '../Notification';
import { NotificationContext } from '@//:modules/focus/notification/provider/NotificationProvider';

it('notification displays success and dismisses', async () => {
  const onExpire = jest.fn();

  const { getByText, getByTestId } = render(
    <NotificationContext.Provider value={{ onExpire }}>
      <Notification type="success" duration={null} id={1}>
        success
      </Notification>
    </NotificationContext.Provider>,
  );

  expect(getByText('success')).toBeVisible();

  const button = getByTestId('close');

  expect(button).toBeVisible();

  // click the dismiss button
  fireEvent.click(button);

  // expect the provider's onExpire method to be called
  expect(onExpire).toHaveBeenLastCalledWith(1);
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

  jest.runOnlyPendingTimers();

  // expect the provider's onExpire method to be called
  await waitFor(() => expect(onExpire).toHaveBeenLastCalledWith(1));
});

it('notification displays error', async () => {
  const { getByText } = render(
    <Notification type="error" duration={null} id={1}>
      error
    </Notification>,
  );

  expect(getByText('error')).toBeVisible();
});

it('notification displays warning', async () => {
  const { getByText } = render(
    <Notification type="warning" duration={null} id={1}>
      warning
    </Notification>,
  );

  expect(getByText('warning')).toBeVisible();
});
