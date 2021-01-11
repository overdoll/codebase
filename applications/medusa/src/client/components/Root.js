import { Suspense, useEffect, useState } from 'react';
import { graphql, usePreloadedQuery } from 'react-relay/hooks';

const RootQuery = graphql`
  query RootQuery {
    authentication {
      user {
        username
      }
      cookie {
        redeemed
        registered
        sameSession
      }
    }
  }
`;

export default function Root({ children, prepared }) {
  const result = usePreloadedQuery(RootQuery, prepared.stateQuery);
  return <Suspense fallback={<div>loading...</div>}>{children}</Suspense>;
}
