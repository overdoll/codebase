import withProviders from '@//:modules/testing/withProviders';
import { render, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import Section from '../Section';

it('should render tag artists', async () => {
  const Children = () => <div>header</div>;

  const Search = ({ args, onClose }) => {
    return <button onClick={onClose}>opencomponent</button>;
  };

  const SectionComponent = () => {
    return (
      <Section
        search={(args, onClose) => <Search onClose={onClose} args={args} />}
      >
        <Children />
      </Section>
    );
  };

  const [Root] = withProviders({
    Component: SectionComponent,
  });

  const { getByRole, getByText } = render(<Root />);

  // expect that children were rendered correctly
  expect(getByText('header')).toBeInTheDocument();

  // when we click the button, expect that "Search" will open
  const button = getByRole('button');
  userEvent.click(button);

  const openButton = getByRole('button', { name: 'opencomponent' });

  // expect that our opened component is visible
  await waitFor(() => expect(openButton).toBeInTheDocument());

  // click our onclose button
  userEvent.click(openButton);

  // expect that our component was closed
  await waitFor(() => expect(openButton).not.toBeInTheDocument());
});
