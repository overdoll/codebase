import { Suspense, createContext, useState, useEffect } from 'react';
import { graphql, usePreloadedQuery } from 'react-relay/hooks';
import { useRoutingContext } from '@//:modules/routing/RoutingContext';

const RootContext = createContext({});

const RootQuery = graphql`
  query RootQuery {
    authentication {
      user {
        username
      }
      ...JoinFragment
    }
  }
`;

/**
 *
 * @param children
 * @param prepared
 * @returns {JSX.Element}
 * @constructor
 */
export default function Root({ children, prepared }) {
  const rootQuery = usePreloadedQuery(RootQuery, prepared.stateQuery);
  const context = useRoutingContext();
  const [redirecting, setRedirecting] = useState(false);

  // On the first render of the root component, we need to check to make sure that
  // the route that the user is about to access is one that they should be accessing.
  useEffect(() => {
    const entries = context.get().entries;
  }, []);

  if (redirecting) {
    return null;
  }

  return (
    <RootContext.Provider value={rootQuery}>
      <Suspense fallback={null}>{children}</Suspense>
    </RootContext.Provider>
  );
}

export { RootContext };
