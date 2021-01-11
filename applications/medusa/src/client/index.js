import App from './App';
import { unstable_createRoot as createRoot } from 'react-dom';
import { createBrowserHistory } from 'history';
import createRouter from '@//:modules/routing/createRouter';
import routes from './routes';
import RelayEnvironment from './RelayEnvironment';
import { loadableReady } from '@loadable/component';

const router = createRouter(routes, createBrowserHistory(), RelayEnvironment);

const Root = ({ File }) => {
  return <File router={router} environment={RelayEnvironment} />;
};

loadableReady().then(() => {
  createRoot(document.getElementById('root')).render(<Root File={App} />);
});

if (module.hot) {
  module.hot.accept('./App', () => {
    const NextRoot = require('./App').default;
    createRoot(document.getElementById('root')).render(
      <Root File={NextRoot} />,
    );
  });
}
