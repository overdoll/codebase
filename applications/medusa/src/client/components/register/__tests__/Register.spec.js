import { fireEvent, render } from '@testing-library/react';
import Register from '../Register';

it('Register just works', () => {
  const { queryByLabelText, getByLabelText } = render(<Register />);

  expect(queryByLabelText(/off/i)).toBeTruthy();

  fireEvent.click(getByLabelText(/off/i));

  expect(queryByLabelText(/on/i)).toBeTruthy();
});
