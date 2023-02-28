import { DiscoverClubsListFragment$key } from '@//:artifacts/DiscoverClubsListFragment.graphql'
import type { DiscoverClubsQuery } from '@//:artifacts/DiscoverClubsQuery.graphql'
import { Box, Center, Grid } from '@chakra-ui/react'
import { Trans } from '@lingui/macro'
import { graphql, usePaginationFragment } from 'react-relay'
import { LoadMore } from '../../../../ContentSelection'
import { EmptyBoundary, EmptyClubs } from '../../../../Placeholder'
import DiscoverClubPreview from '../../../Club/fragments/DiscoverClubPreview/DiscoverClubPreview'
import MemoKey from '../../../Post/components/PaginationScroller/MemoKey/MemoKey'

interface Props {
  query: DiscoverClubsListFragment$key
}

const Fragment = graphql`
  fragment DiscoverClubsListFragment on Query
  @argumentDefinitions(
    first: {type: Int, defaultValue: 12}
    after: {type: String}
  )
  @refetchable(queryName: "DiscoverClubsPaginationQuery" ) {
    discoverClubs (first: $first, after: $after)
    @connection (key: "DiscoverClubs_discoverClubs") {
      edges {
        node {
          id
          ...ClubJoinTileFragment
          ...DiscoverClubPreviewFragment
        }
      }
    }
    viewer {
      ...ClubJoinTileViewerFragment
      ...DiscoverClubPreviewViewerFragment
    }
  }
`

export default function DiscoverClubsList (props: Props): JSX.Element {
  const {
    query
  } = props

  const {
    data,
    loadNext,
    hasNext,
    isLoadingNext
  } = usePaginationFragment<DiscoverClubsQuery, any>(
    Fragment,
    query
  )

  return (
    <EmptyBoundary
      fallback={
        <EmptyClubs />
  }
      condition={data.discoverClubs.edges.length < 1}
    >
      <Grid
        overflow='visible'
        rowGap={4}
        columnGap={4}
        templateColumns='repeat(auto-fill, minmax(305px, 1fr))'
      >
        {data.discoverClubs.edges.map((item) =>
          <Box
            key={item.node.id}
            position='relative'
          >
            <Box pt='50%' />
            <Box top={0} w='100%' h='100%' position='absolute'>
              <MemoKey memoKey={item.node.id}>
                <DiscoverClubPreview clubQuery={item.node} viewerQuery={data.viewer} />
              </MemoKey>
            </Box>
          </Box>)}
        {hasNext && (
          <Center w='100%' h='100%' borderRadius='md' bg='gray.800'>
            <LoadMore
              text={<Trans>View More Clubs</Trans>}
              onLoadNext={() => loadNext(12)}
              isLoadingNext={isLoadingNext}
            />
          </Center>
        )}
      </Grid>
    </EmptyBoundary>
  )
}
