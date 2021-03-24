import { fireEvent, render, waitFor } from '@testing-library/react';
import NotificationProvider from '@//:modules/focus/notification/provider/NotificationProvider';
import { useNotify } from '@//:modules/focus';

it('creates a warn notification and dismisses', async () => {
  const WrapperComponent = () => {
    const notify = useNotify();
    return <button onClick={() => notify.warn('warn')} />;
  };

  const { getByText, getByTestId, getByRole } = render(
    <NotificationProvider>
      <WrapperComponent />
    </NotificationProvider>,
  );

  const button = getByRole('button');

  // create notification
  fireEvent.click(button);

  // notification is visible with the text
  await waitFor(() => expect(getByText('warn')).toBeVisible());

  // dismiss notification
  const dismiss = getByTestId('close');
  fireEvent.click(dismiss);

  await waitFor(() => expect(dismiss).not.toBeInTheDocument());
});

it('creates a success notification', async () => {
  const WrapperComponent = () => {
    const notify = useNotify();
    return <button onClick={() => notify.success('success')} />;
  };

  const { getByText, getByRole } = render(
    <NotificationProvider>
      <WrapperComponent />
    </NotificationProvider>,
  );

  const button = getByRole('button');

  // create notification
  fireEvent.click(button);

  // notification is visible with the text
  await waitFor(() => expect(getByText('success')).toBeVisible());
});

it('creates an error notification', async () => {
  const WrapperComponent = () => {
    const notify = useNotify();
    return <button onClick={() => notify.error('error')} />;
  };

  const { getByText, getByRole } = render(
    <NotificationProvider>
      <WrapperComponent />
    </NotificationProvider>,
  );

  const button = getByRole('button');

  // create notification
  fireEvent.click(button);

  // notification is visible with the text
  await waitFor(() => expect(getByText('error')).toBeVisible());
});
