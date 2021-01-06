import './index.css';
import RouterRenderer from '@//:modules/routing/RouteRenderer';
import loadable from '@loadable/component';

// Uses the custom router setup to define a router instance that we can pass through context
const App = () => {
  return <RouterRenderer />;
};

export default App;
