import { Suspense } from 'react';

export default function Root({ children }) {
  return <Suspense fallback={<div>loading...</div>}>{children}</Suspense>;
}
