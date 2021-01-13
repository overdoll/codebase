import { Suspense, createContext } from 'react';
import { graphql, usePreloadedQuery, useFragment } from 'react-relay/hooks';

const RootQuery = graphql`
  query RootQuery {
    authentication {
      ...RootData
    }
  }
`;

const RootDataFragment = graphql`
  fragment RootData on Authentication {
    ...RootUser
  }
`;

const RootUserFragment = graphql`
  fragment RootUser on Authentication {
    user {
      username
    }
  }
`;

const RootContext = createContext({});

export default function Root({ children, prepared }) {
  const rootData = usePreloadedQuery(RootQuery, prepared.stateQuery);
  const rootFragment = useFragment(RootDataFragment);
  const userData = useFragment(RootUserFragment, rootFragment);

  // TODO: check here to make sure that our user is allowed to be in this route. for now if the user exists, return null
  if (userData !== null) {
    console.log(userData.username);
    return null;
  }

  return (
    <RootContext.Provider value={rootFragment}>
      <Suspense fallback={<div>loading...</div>}>{children}</Suspense>
    </RootContext.Provider>
  );
}

export { RootContext };
