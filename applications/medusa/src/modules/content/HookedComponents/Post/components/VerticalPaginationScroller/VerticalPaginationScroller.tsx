import { Disposable, useFragment } from 'react-relay/hooks'
import { graphql } from 'react-relay'
import { Box } from '@chakra-ui/react'
import type { VerticalPaginationScrollerFragment$key } from '@//:artifacts/VerticalPaginationScrollerFragment.graphql'
import LoadMoreObserver from './LoadMoreObserver/LoadMoreObserver'
import { LoadMoreFn } from 'react-relay/relay-hooks/useLoadMoreFunction'
import runIfFunction from '../../../../../support/runIfFunction'
import { MaybeRenderProp } from '@//:types/components'
import VerticalPaginationFooter from './VerticalPaginationFooter/VerticalPaginationFooter'
import { useEffect, useState } from 'react'
import { DisposeFn } from 'relay-runtime/lib/util/RelayRuntimeTypes'
import EmptyPaginationScroller from './EmptyPaginationScroller/EmptyPaginationScroller'

interface ChildrenCallable {
  index: number
}

interface Props {
  postConnectionQuery: VerticalPaginationScrollerFragment$key
  hasNext: boolean
  loadNext: LoadMoreFn<any>
  isLoadingNext: boolean
  children: MaybeRenderProp<ChildrenCallable>
}

const PostConnectionFragment = graphql`
  fragment VerticalPaginationScrollerFragment on PostConnection {
    edges {
      node {
        id
      }
    }
  }
`

export default function VerticalPaginationScroller (props: Props): JSX.Element {
  const {
    postConnectionQuery,
    hasNext,
    loadNext,
    isLoadingNext,
    children
  } = props

  const data = useFragment(PostConnectionFragment, postConnectionQuery)

  const [hasError, setHasError] = useState(false)
  const [dispose, setDispose] = useState<DisposeFn | null>(null)

  const onLoadNext = (): void => {
    setHasError(false)
    const disposedLoad = (): Disposable => {
      return loadNext(12, {
        onComplete: (error) => {
          if (error != null) {
            setHasError(true)
          }
        }
      })
    }
    disposedLoad()
    setDispose(disposedLoad().dispose)
  }

  // on unmount, we dispose of the query if it's loading data
  useEffect(() => {
    return () => {
      if (dispose != null && isLoadingNext) {
        dispose()
      }
    }
  }, [dispose, isLoadingNext])

  if (data?.edges.length < 1) {
    return <EmptyPaginationScroller />
  }

  return (
    <Box>
      {data?.edges.map((item, index) =>
        (
          <Box mb={16} key={item.node.id}>
            {(hasNext && !isLoadingNext && !hasError && data.edges.length - 2 === index) &&
              <LoadMoreObserver onObserve={onLoadNext} />}
            {runIfFunction(children, {
              index
            })}
          </Box>
        ))}
      <VerticalPaginationFooter
        loadNext={onLoadNext}
        hasNext={hasNext}
        hasError={hasError}
        isLoadingNext={isLoadingNext}
      />
    </Box>
  )
}
