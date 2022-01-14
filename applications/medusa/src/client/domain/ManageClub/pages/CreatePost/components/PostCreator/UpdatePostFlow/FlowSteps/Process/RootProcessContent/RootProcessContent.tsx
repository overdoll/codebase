import type { RootProcessContentFragment$key } from '@//:artifacts/RootProcessContentFragment.graphql'
import { graphql } from 'react-relay/hooks'
import { useFragment } from 'react-relay'
import CenteredSpinner from '@//:modules/content/Skeleton/Loading/CenteredSpinner/CenteredSpinner'
import ErrorFallback from '@//:modules/content/Skeleton/Fallback/ErrorFallback/ErrorFallback'
import ProcessContent from './ProcessContent/ProcessContent'
import { Suspense, useCallback, useEffect, useState } from 'react'
import ErrorBoundary from '@//:modules/operations/ErrorBoundary'

interface Props {
  query: RootProcessContentFragment$key
}

const Fragment = graphql`
  fragment RootProcessContentFragment on Post {
    reference
    content {
      processed
    }
  }
`

export default function RootProcessContent ({
  query
}: Props): JSX.Element {
  const data = useFragment(Fragment, query)

  const [queryArgs, setQueryArgs] = useState({
    options: { fetchKey: 0 },
    variables: {
      reference: data.reference
    }
  })

  const refetch = useCallback(() => {
    setQueryArgs(prev => ({
      options: {
        fetchKey: (prev?.options?.fetchKey ?? 0) + 1
      },
      variables: {
        reference: data.reference
      }
    }))
  }, [])

  const isProcessed = (): boolean => {
    const processed = data?.content.map((item) => item.processed)
    return processed.every(x => x)
  }

  useEffect(() => {
    const timerObject = setTimeout(() => {
      if (!isProcessed()) {
        refetch()
      }
    }, 1000)

    return () => clearTimeout(timerObject)
  })

  return (
    <Suspense fallback={<CenteredSpinner />}>
      <ErrorBoundary
        fallback={({
          error,
          reset
        }) => (
          <ErrorFallback error={error} reset={reset} refetch={refetch as () => void} />
        )}
      >
        <ProcessContent queryArgs={queryArgs} />
      </ErrorBoundary>
    </Suspense>
  )
}
