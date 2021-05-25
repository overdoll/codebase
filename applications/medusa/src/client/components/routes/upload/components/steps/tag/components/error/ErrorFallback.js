/**
 * @flow
 */
import type { Node } from 'react'
import type { Error } from '@//:modules/utilities/ErrorBoundary'

type Props = {
  error: Error,
  reset: () => void,
  refetch: () => void,
};

// eslint-disable-next-line node/handle-callback-err
export default function ErrorFallback ({ error, reset, refetch }: Props): Node {
  const onReset = () => {
    // Refetch graphql data
    refetch()

    // reset error boundary to re-render
    reset()
  }

  return (
    <div sx={{ backgroundColor: 'red' }}>
      <div>there was an error with loading</div>
      <button onClick={onReset}>retry</button>
    </div>
  )
}
