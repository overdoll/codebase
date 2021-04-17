import { render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { Form, Input, useForm } from '@//:modules/form';

it('should do input correctly', async () => {
  const submit = jest.fn();

  const FormComponent = () => {
    const instance = useForm();

    return (
      <Form instance={instance} onSubmit={submit}>
        <Input title="name" name="name" />
        <button type="submit" />
      </Form>
    );
  };

  render(<FormComponent />);

  const input = screen.getByRole('textbox', { name: 'name' });
  userEvent.type(input, 'test input text');

  // expect that the input actually worked as intended
  await waitFor(() =>
    expect(screen.getByDisplayValue('test input text')).toBeInTheDocument(),
  );

  const button = screen.getByRole('button');
  userEvent.click(button);

  // test that our form submit worked
  await waitFor(() => expect(submit).toHaveBeenCalled());
});

it('should not submit when validation fails', async () => {
  const submit = jest.fn();

  const FormComponent = () => {
    const instance = useForm();

    return (
      <Form instance={instance} onSubmit={submit}>
        <Input
          title="name"
          name="name"
          validation={{
            required: {
              value: true,
              message: 'bad',
            },
          }}
        />
        <button type="submit" />
      </Form>
    );
  };

  render(<FormComponent />);

  const button = screen.getByRole('button');
  userEvent.click(button);

  // test that the submit method wasnt called because validation failed
  await waitFor(() => expect(submit).not.toHaveBeenCalled());
});
