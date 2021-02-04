import { Suspense, createContext, useState, useEffect } from 'react';
import { graphql, usePreloadedQuery } from 'react-relay/hooks';

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
  return (
    <RootContext.Provider value={rootQuery}>
      <Suspense fallback={null}>{children}</Suspense>
    </RootContext.Provider>
  );
}

export { RootContext };
