import { graphql, usePaginationFragment } from 'react-relay'
import { ClubTileOverlay, GridTile, GridWrap, LinkTile, LoadMoreGridTile } from '@//:modules/content/ContentSelection'
import { Box } from '@chakra-ui/react'
import { DiscoverClubsListFragment$key } from '@//:artifacts/DiscoverClubsListFragment.graphql'
import { EmptyBoundary, EmptyClubs } from '@//:modules/content/Placeholder'
import JoinClubFromTile
  from '../../../../../slug/club/RootPublicClub/PublicClub/JoinClubButton/JoinClubFromTile/JoinClubFromTile'
import type { DiscoverClubsQuery } from '@//:artifacts/DiscoverClubsQuery.graphql'

interface Props {
  query: DiscoverClubsListFragment$key
}

const Fragment = graphql`
  fragment DiscoverClubsListFragment on Query
  @argumentDefinitions(
    first: {type: Int, defaultValue: 11}
    after: {type: String}
  )
  @refetchable(queryName: "DiscoverClubsPaginationQuery" ) {
    discoverClubs (first: $first, after: $after)
    @connection (key: "DiscoverClubs_discoverClubs") {
      edges {
        node {
          slug
          ...JoinClubFromTileFragment
          ...ClubTileOverlayFragment
        }
      }
    }
    viewer {
      ...JoinClubFromTileViewerFragment
    }
  }
`

export default function DiscoverClubsList ({
  query
}: Props): JSX.Element {
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
    <>
      <EmptyBoundary
        fallback={
          <EmptyClubs />
        }
        condition={data.discoverClubs.edges.length < 1}
      >
        <GridWrap>
          {data.discoverClubs.edges.map((item, index) =>
            <Box key={index} h='100%'>
              <GridTile key={index}>
                <LinkTile href={`/${item.node.slug as string}`}>
                  <ClubTileOverlay query={item.node} />
                </LinkTile>
              </GridTile>
              <Box mt={2}>
                <JoinClubFromTile w='100%' size='md' clubQuery={item.node} viewerQuery={data?.viewer} />
              </Box>
            </Box>)}
          <LoadMoreGridTile
            hasNext={hasNext}
            onLoadNext={() => loadNext(9)}
            isLoadingNext={isLoadingNext}
          />
        </GridWrap>
      </EmptyBoundary>
    </>
  )
}
