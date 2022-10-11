import { useFragment } from 'react-relay/hooks'
import { graphql } from 'react-relay'
import { Box } from '@chakra-ui/react'
import type { VerticalPaginationScrollerFragment$key } from '@//:artifacts/VerticalPaginationScrollerFragment.graphql'
import { LoadMoreFn } from 'react-relay/relay-hooks/useLoadMoreFunction'
import runIfFunction from '../../../../../support/runIfFunction'
import { MaybeRenderProp } from '@//:types/components'
import VerticalPaginationFooter from './VerticalPaginationFooter/VerticalPaginationFooter'
import { Fragment } from 'react'
import EmptyPaginationScroller from './EmptyPaginationScroller/EmptyPaginationScroller'
import MemoKey from './MemoKey/MemoKey'
import JoinRedirectPrompt from '@//:common/components/JoinRedirectPrompt/JoinRedirectPrompt'
import usePaginationScroller from './usePaginationScroller'
import LoadMoreObserver from './LoadMoreObserver/LoadMoreObserver'

interface ChildrenCallable {
  index: number
}

interface Props {
  postConnectionQuery: VerticalPaginationScrollerFragment$key
  hasNext: boolean
  loadNext: LoadMoreFn<any>
  isLoadingNext: boolean
  children: MaybeRenderProp<ChildrenCallable>
  limit?: number
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
    children,
    limit
  } = props

  const data = useFragment(PostConnectionFragment, postConnectionQuery)

  const {
    hasError,
    onLoadNext,
    isPending
  } = usePaginationScroller({
    loadNext,
    isLoadingNext
  })

  if (data == null || data?.edges.length < 1) {
    return <EmptyPaginationScroller />
  }

  const canLoadNext = limit == null || (data.edges.length <= limit)

  // we use a memo here because loading more posts re-renders the whole tree
  // since additional dom nodes are added
  // this helps with performance
  return (
    <Box>
      {data?.edges.map((item, index) => (
        <Fragment key={item.node.id}>
          {(canLoadNext && hasNext && !hasError && data.edges.length - 2 === index) &&
            <LoadMoreObserver isLoadingNext={isPending || isLoadingNext} onObserve={onLoadNext} />}
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
      {canLoadNext && (
        <VerticalPaginationFooter
          loadNext={onLoadNext}
          hasNext={hasNext}
          hasError={hasError}
          isLoadingNext={isLoadingNext || isPending}
        />
      )}
    </Box>
  )
}
