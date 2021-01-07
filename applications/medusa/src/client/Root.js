import { Suspense } from 'react';
import { usePreloadedQuery } from 'react-relay/hooks';
import { StateQuery } from './queries/token';

export default function Root({ children, prepared }) {
  console.log(prepared.stateQuery);
  const result = usePreloadedQuery(StateQuery, prepared.stateQuery);
  console.log(result);
  return <Suspense fallback={<div>loading...</div>}>{children}</Suspense>;
}
