import { Suspense, createContext } from 'react';
import { graphql, usePreloadedQuery } from 'react-relay/hooks';

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

const RootContext = createContext({});

export default function Root({ children, prepared }) {
  const rootQuery = usePreloadedQuery(RootQuery, prepared.stateQuery);

  // TODO: check here to make sure that our user is allowed to be in this route. for now if the user exists, return null
  if (
    rootQuery.authentication !== null &&
    rootQuery.authentication.user !== null
  ) {
  }

  return (
    <RootContext.Provider value={rootQuery}>
      <Suspense fallback={<div>loading...</div>}>{children}</Suspense>
    </RootContext.Provider>
  );
}

export { RootContext };
