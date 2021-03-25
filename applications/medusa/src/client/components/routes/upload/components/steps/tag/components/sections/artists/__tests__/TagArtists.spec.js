import withProviders from '@//:modules/testing/withProviders';
import { render } from '@testing-library/react';
import TagArtists from '../TagArtists';

it('should render tag artists', async () => {
  const dispatch = jest.fn();

  const TagArtistsComponent = () => {
    return (
      <TagArtists
        dispatch={dispatch}
        state={{
          artist: {},
        }}
      />
    );
  };

  const [Root] = withProviders({
    Component: TagArtistsComponent,
  });

  render(<Root />);
});
