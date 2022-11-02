import { GridPaginationScrollerFragment$key } from '@//:artifacts/GridPaginationScrollerFragment.graphql'
import { LoadMoreFn } from 'react-relay/relay-hooks/useLoadMoreFunction'
import { graphql } from 'react-relay'
import { useFragment } from 'react-relay/hooks'
import EmptyPaginationScroller from '../EmptyPaginationScroller/EmptyPaginationScroller'
import { Box, Grid } from '@chakra-ui/react'
import VerticalPaginationFooter from '../VerticalPaginationFooter/VerticalPaginationFooter'
import usePaginationScroller from '../usePaginationScroller'
import GridPaginationPost from './GridPaginationPost/GridPaginationPost'
import MemoKey from '../MemoKey/MemoKey'

interface Props {
  postConnectionQuery: GridPaginationScrollerFragment$key
  hasNext: boolean
  loadNext: LoadMoreFn<any>
  isLoadingNext: boolean
  limit?: number
}

const Fragment = graphql`
  fragment GridPaginationScrollerFragment on PostConnection {
    __id
    edges {
      node {
        id
        ...GridPaginationPostFragment
      }
    }
  }
`

export default function GridPaginationScroller (props: Props): JSX.Element {
  const {
    postConnectionQuery,
    hasNext,
    loadNext,
    isLoadingNext,
    limit
  } = props

  const data = useFragment(Fragment, postConnectionQuery)

  const {
    hasError,
    onLoadNext,
    isPending
  } = usePaginationScroller({
    loadNext,
    isLoadingNext,
    loadCount: 12,
    limit,
    currentCount: data.edges.length
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
      <Grid
        overflow='visible'
        rowGap={5}
        columnGap={5}
        templateColumns={{
          base: 'repeat(2, minmax(150px, 1fr))',
          lg: 'repeat(3, minmax(150px, 1fr))'
        }}
      >
        {data?.edges.map((item) => (
          <Box
            key={item.node.id}
            position='relative'
          >
            <Box pt='100%' />
            <Box top={0} w='100%' h='100%' position='absolute'>
              <MemoKey memoKey={item.node.id}>
                <GridPaginationPost query={item.node} />
              </MemoKey>
            </Box>
          </Box>
        ))}
      </Grid>
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
