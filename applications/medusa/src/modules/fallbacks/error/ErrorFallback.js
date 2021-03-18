/**
 * @flow
 */
import type { Node } from 'react';
import type { Error } from '@//:modules/utilities/ErrorBoundary';

type Props = {
  error: Error,
  reset: any,
};

// eslint-disable-next-line node/handle-callback-err
export default function ErrorFallback({ error, reset }: Props): Node {
  return (
    <>
      <div>there was an error with loading</div>
      <button onClick={reset}>retry</button>
    </>
  );
}
