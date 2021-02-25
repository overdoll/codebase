import { fireEvent, render } from '@testing-library/react';
import Register from '../Register';
import withProviders from '@//:modules/testing/withProviders';

it('Register just works', () => {
  const Root = withProviders({ Component: Register });

  const { queryByLabelText, getByLabelText } = render(<Root />);

  expect(queryByLabelText(/off/i)).toBeTruthy();

  fireEvent.click(getByLabelText(/off/i));

  expect(queryByLabelText(/on/i)).toBeTruthy();
});
