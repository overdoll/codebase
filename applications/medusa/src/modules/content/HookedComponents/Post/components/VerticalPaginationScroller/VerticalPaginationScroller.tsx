import { Disposable, useFragment } from 'react-relay/hooks'
import { graphql } from 'react-relay'
import { Box } from '@chakra-ui/react'
import type { VerticalPaginationScrollerFragment$key } from '@//:artifacts/VerticalPaginationScrollerFragment.graphql'
import LoadMoreObserver from './LoadMoreObserver/LoadMoreObserver'
import { LoadMoreFn } from 'react-relay/relay-hooks/useLoadMoreFunction'
import runIfFunction from '../../../../../support/runIfFunction'
import { MaybeRenderProp } from '@//:types/components'
import VerticalPaginationFooter from './VerticalPaginationFooter/VerticalPaginationFooter'
import { Fragment, useEffect, useState, useTransition } from 'react'
import { DisposeFn } from 'relay-runtime/lib/util/RelayRuntimeTypes'
import EmptyPaginationScroller from './EmptyPaginationScroller/EmptyPaginationScroller'
import MemoKey from './MemoKey/MemoKey'
import JoinRedirectPrompt from '@//:common/components/JoinRedirectPrompt/JoinRedirectPrompt'

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
  // @ts-expect-error
  const [isPending, startTransition] = useTransition({
    timeoutMs: 300
  })

  const onLoadNext = (): void => {
    setHasError(false)
    const disposedLoad = (): Disposable => {
      return loadNext(8, {
        onComplete: (error) => {
          if (error != null) {
            setHasError(true)
          }
        }
      })
    }

    // this might cause errors but its really necessary to prevent noticeable
    // lag that happens when loading more on mobile
    // gives a much smoother experience
    startTransition(() => {
      disposedLoad()
    })
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

  // we use a memo here because loading more posts re-renders the whole tree
  // since additional dom nodes are added
  // this helps with performance
  return (
    <Box>
      {data?.edges.map((item, index) => (
        <Fragment key={item.node.id}>
          {(hasNext && !isPending && !isLoadingNext && !hasError && data.edges.length - 2 === index) &&
            <LoadMoreObserver onObserve={onLoadNext} />}
          {(index % 10 === 0 && index !== 0) && (
            <JoinRedirectPrompt mb={16} seed={item.node.id} />
          )}
          <MemoKey memoKey={item.node.id}>
            <Box mb={16}>
              {runIfFunction(children, {
                index
              })}
            </Box>
          </MemoKey>
        </Fragment>
      ))}
      <VerticalPaginationFooter
        loadNext={onLoadNext}
        hasNext={hasNext}
        hasError={hasError}
        isLoadingNext={isLoadingNext || isPending}
      />
    </Box>
  )
}
