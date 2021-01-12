import createRouter from '@//:modules/routing/createRouter';
import routes from './routes';
import { createBrowserHistory } from 'history';
import RelayEnvironment from './relay/RelayEnvironment';
import App from './App';

const router = createRouter(routes, createBrowserHistory(), RelayEnvironment);

// Client-only initialization - if some things are only available with the DOM, they should be initialized here
export default function Client(props) {
  return <App router={router} environment={RelayEnvironment} />;
}
