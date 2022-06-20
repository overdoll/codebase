import { graphql, usePaginationFragment } from 'react-relay'
import { ClubTileOverlay, GridTile, GridWrap, LinkTile, LoadMoreGridTile } from '@//:modules/content/ContentSelection'
import { useLazyLoadQuery } from 'react-relay/hooks'
import { Box } from '@chakra-ui/react'
import { SuggestedClubsQuery } from '@//:artifacts/SuggestedClubsQuery.graphql'
import { ComponentSearchArguments } from '@//:modules/content/HookedComponents/Search/types'
import { EmptyBoundary, EmptyClubs } from '@//:modules/content/Placeholder'
import JoinClubFromTile
  from '../../../../../slug/root/RootPublicClub/PublicClub/JoinClubButton/JoinClubFromTile/JoinClubFromTile'

interface Props extends ComponentSearchArguments<any> {
}

const Query = graphql`
  query SuggestedClubsQuery($search: String) {
    ...SuggestedClubsFragment
    viewer {
      ...JoinClubFromTileViewerFragment
    }
  }
`

const Fragment = graphql`
  fragment SuggestedClubsFragment on Query
  @argumentDefinitions(
    first: {type: Int, defaultValue: 11}
    after: {type: String}
  )
  @refetchable(queryName: "SuggestedClubsPaginationQuery" ) {
    clubs (first: $first, after: $after, name: $search, terminated: false)
    @connection (key: "SuggestedClubs_clubs") {
      edges {
        node {
          slug
          ...JoinClubFromTileFragment
          ...ClubTileOverlayFragment
        }
      }
    }
  }
`

export default function SuggestedClubs ({
  searchArguments
}: Props): JSX.Element {
  const queryData = useLazyLoadQuery<SuggestedClubsQuery>(
    Query,
    searchArguments.variables,
    searchArguments.options
  )

  const {
    data,
    loadNext,
    hasNext,
    isLoadingNext
  } = usePaginationFragment<SuggestedClubsQuery, any>(
    Fragment,
    queryData
  )

  return (
    <>
      <EmptyBoundary
        fallback={
          <EmptyClubs hint={searchArguments.variables.search} />
        }
        condition={data.clubs.edges.length < 1}
      >
        <GridWrap>
          {data.clubs.edges.map((item, index) =>
            <Box key={index} h='100%'>
              <GridTile key={index}>
                <LinkTile href={`/${item.node.slug as string}`}>
                  <ClubTileOverlay query={item.node} />
                </LinkTile>
              </GridTile>
              <Box mt={2}>
                <JoinClubFromTile w='100%' size='md' clubQuery={item.node} viewerQuery={queryData?.viewer} />
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
