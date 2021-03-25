import withProviders from '@//:modules/testing/withProviders';
import { render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import Search from '../Search';

it('should search when input changes', async () => {
  const Header = () => <div>header</div>;

  const search = 'search';

  const SearchContainer = ({ args }) => {
    return <div>searchcontent</div>;
  };

  const SearchComponent = () => {
    return (
      <Search header={<Header />}>
        {args => <SearchContainer args={args} />}
      </Search>
    );
  };

  const [Root] = withProviders({
    Component: SearchComponent,
  });

  const { getByRole, getByText } = render(<Root />);

  // expect that children were rendered correctly
  expect(getByText('header')).toBeInTheDocument();

  const input = getByRole('textbox');
  userEvent.type(input, search);

  await waitFor(() => expect(input).toHaveValue(search));
});

it('should ask to refetch when error occurs', async () => {
  const spy = jest.spyOn(console, 'error');
  spy.mockImplementation(() => {});

  const func = jest.fn();

  const SearchContainer = ({ args }) => {
    func(args);
    throw new Error('error');
  };

  const SearchComponent = () => {
    return (
      <Search header={null}>{args => <SearchContainer args={args} />}</Search>
    );
  };

  const [Root] = withProviders({
    Component: SearchComponent,
  });

  render(<Root />);

  const button = screen.getByRole('button', { name: 'retry' });

  expect(button).toBeInTheDocument();

  userEvent.click(button);

  await waitFor(() =>
    expect(func).toHaveBeenLastCalledWith({
      options: {
        // fetchkey was 0 on the first fetch. after the error it should have increased to 1
        fetchKey: 1,
      },
      variables: {
        data: {
          search: '',
        },
      },
    }),
  );
});
