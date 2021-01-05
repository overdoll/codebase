import { Suspense } from 'react';
import { usePreloadedQuery } from 'react-relay/hooks';
import { StateQuery } from './queries/token';

export default function Root({ children, prepared }) {
  const result = usePreloadedQuery(StateQuery, prepared.stateQuery);

  return <Suspense fallback={<div>loading...</div>}>{children}</Suspense>;
}
