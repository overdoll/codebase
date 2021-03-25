import Root from '../../Root';
import withProviders from '@//:modules/testing/withProviders';
import { render } from '@testing-library/react';
import Upload from '../Upload';

it('should render the upload component', async () => {
  const RootComponent = () => {
    return <Upload />;
  };

  const [Root] = withProviders({
    Component: RootComponent,
  });

  const { getByText } = render(<Root />);
});
