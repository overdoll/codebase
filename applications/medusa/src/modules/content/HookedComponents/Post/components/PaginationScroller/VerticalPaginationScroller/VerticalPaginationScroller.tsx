import { useFragment } from 'react-relay/hooks'
import { graphql } from 'react-relay'
import { Box } from '@chakra-ui/react'
import type { VerticalPaginationScrollerFragment$key } from '@//:artifacts/VerticalPaginationScrollerFragment.graphql'
import { LoadMoreFn } from 'react-relay/relay-hooks/useLoadMoreFunction'
import VerticalPaginationFooter from '../VerticalPaginationFooter/VerticalPaginationFooter'
import { Fragment } from 'react'
import EmptyPaginationScroller from '../EmptyPaginationScroller/EmptyPaginationScroller'
import MemoKey from '../MemoKey/MemoKey'
import usePaginationScroller from '../usePaginationScroller'
import LoadMoreObserver from '../LoadMoreObserver/LoadMoreObserver'
import { PreviewPost } from '../../../index'
import StickerPromoteBanner from '@//:common/components/StickerPromoteBanner/StickerPromoteBanner'

interface Props {
  postConnectionQuery: VerticalPaginationScrollerFragment$key
  hasNext: boolean
  loadNext: LoadMoreFn<any>
  isLoadingNext: boolean
  limit?: number
}

const PostConnectionFragment = graphql`
  fragment VerticalPaginationScrollerFragment on PostConnection {
    edges {
      node {
        id
        ...PreviewPostFragment
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
    limit,
  } = props

  const data = useFragment(PostConnectionFragment, postConnectionQuery)

  const {
    hasError,
    onLoadNext,
    isPending,
  } = usePaginationScroller({
    loadNext,
    isLoadingNext,
    limit,
    currentCount: data.edges.length,
  })

  if (data?.edges.length < 1) {
    return <EmptyPaginationScroller />
  }

  const canLoadNext = (limit == null || (data.edges.length <= limit)) && data.edges.length !== limit

  // we use a memo here because loading more posts re-renders the whole tree
  // since additional dom nodes are added
  // this helps with performance
  return (
    <Box>
      {data?.edges.map((item, index) => (
        <Fragment key={item.node.id}>
          {(canLoadNext && hasNext && !hasError && data.edges.length - 2 === index) &&
            <LoadMoreObserver isLoadingNext={isPending || isLoadingNext} onObserve={onLoadNext} />}
          <MemoKey memoKey={item.node.id}>
            <Box mb={16}>
              <PreviewPost
                postQuery={item.node}
              />
              {(index % 10 === 0 && index > 0) && (
                <Box mt={4}>
                  <StickerPromoteBanner />
                </Box>
              )}
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
