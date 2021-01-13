import { Suspense, createContext } from 'react';
import { graphql, usePreloadedQuery, useFragment } from 'react-relay/hooks';

const RootQuery = graphql`
  query RootQuery {
    authentication {
      ...UserData
    }
  }
`;

const RootFragment = graphql`
  fragment UserData on Authentication {
    user {
      username
    }
  }
`;

const RootContext = createContext({});

export default function Root({ children, prepared }) {
  const rootData = usePreloadedQuery(RootQuery, prepared.stateQuery);
  const userData = useFragment(RootFragment, rootData);

  // TODO: check here to make sure that our user is allowed to be in this route. for now if the user exists, return null
  if (userData.user !== null) {
    console.log(userData.username);
    return null;
  }

  return (
    <RootContext.Provider value={rootData}>
      <Suspense fallback={<div>loading...</div>}>{children}</Suspense>
    </RootContext.Provider>
  );
}

export { RootContext };
