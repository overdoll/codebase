import { render, screen, waitFor } from '@testing-library/react';
import NotificationProvider from '@//:modules/focus/notification/provider/NotificationProvider';
import { useNotify } from '@//:modules/focus';
import userEvent from '@testing-library/user-event';

it('creates a warn notification and dismisses', async () => {
  const WrapperComponent = () => {
    const notify = useNotify();
    return <button onClick={() => notify.warn('warn')} />;
  };

  render(
    <NotificationProvider>
      <WrapperComponent />
    </NotificationProvider>,
  );

  const button = screen.getByRole('button');

  // create notification
  userEvent.click(button);

  // notification is visible with the text
  await waitFor(() => expect(screen.getByText('warn')).toBeVisible());

  // dismiss notification
  const dismiss = screen.getByTestId('close');
  userEvent.click(dismiss);

  await waitFor(() => expect(dismiss).not.toBeInTheDocument());
});

it('creates a success notification', async () => {
  const WrapperComponent = () => {
    const notify = useNotify();
    return <button onClick={() => notify.success('success')} />;
  };

  render(
    <NotificationProvider>
      <WrapperComponent />
    </NotificationProvider>,
  );

  const button = screen.getByRole('button');

  // create notification
  userEvent.click(button);

  // notification is visible with the text
  await waitFor(() => expect(screen.getByText('success')).toBeVisible());
});

it('creates an error notification', async () => {
  const WrapperComponent = () => {
    const notify = useNotify();
    return <button onClick={() => notify.error('error')} />;
  };

  render(
    <NotificationProvider>
      <WrapperComponent />
    </NotificationProvider>,
  );

  const button = screen.getByRole('button');

  // create notification
  userEvent.click(button);

  // notification is visible with the text
  await waitFor(() => expect(screen.getByText('error')).toBeVisible());
});
