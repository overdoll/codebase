import { graphql, usePaginationFragment } from 'react-relay'
import { GridTile, GridWrap, LoadMore, LoadMoreGridTile } from '../../../../ContentSelection'
import { DiscoverClubsListFragment$key } from '@//:artifacts/DiscoverClubsListFragment.graphql'
import { EmptyBoundary, EmptyClubs } from '../../../../Placeholder'
import type { DiscoverClubsQuery } from '@//:artifacts/DiscoverClubsQuery.graphql'
import ClubJoinTile from './ClubJoinTile/ClubJoinTile'
import { Trans } from '@lingui/macro'
import useFeatureFlag from '../../../../../hooks/useFeatureFlag'
import DiscoverClubPreview from '../../../Club/fragments/DiscoverClubPreview/DiscoverClubPreview'
import { Box, Center, Grid } from '@chakra-ui/react'
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

  const flag = useFeatureFlag('club-preview')

  if (true) {
    return (
      <>
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
      </>
    )
  }

  return (
    <>
      <EmptyBoundary
        fallback={
          <EmptyClubs />
        }
        condition={data.discoverClubs.edges.length < 1}
      >
        <GridWrap templateColumns='repeat(auto-fill, minmax(150px, 1fr))'>
          {data.discoverClubs.edges.map((item) =>
            <GridTile key={item.node.id}>
              <ClubJoinTile clubQuery={item.node} viewerQuery={data.viewer} />
            </GridTile>)}
          <LoadMoreGridTile
            text={<Trans>View More Clubs</Trans>}
            hasNext={hasNext}
            onLoadNext={() => loadNext(24)}
            isLoadingNext={isLoadingNext}
          />
        </GridWrap>
      </EmptyBoundary>
    </>
  )
}
