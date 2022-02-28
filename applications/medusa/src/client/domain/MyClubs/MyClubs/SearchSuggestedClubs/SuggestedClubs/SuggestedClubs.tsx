import { graphql, usePaginationFragment } from 'react-relay'
import JoinClubButton from '../../../../ManageClub/components/JoinClubButton/JoinClubButton'
import { ClubTileOverlay, GridTile, GridWrap, LinkTile, LoadMoreGridTile } from '@//:modules/content/ContentSelection'
import { useLazyLoadQuery } from 'react-relay/hooks'
import { Trans } from '@lingui/macro'
import { Box } from '@chakra-ui/react'
import { SmallBackgroundBox } from '@//:modules/content/PageLayout'
import { SuggestedClubsQuery } from '@//:artifacts/SuggestedClubsQuery.graphql'
import { ComponentSearchArguments } from '@//:modules/content/HookedComponents/Search/types'
import { EmptyBoundary } from '@//:modules/content/Placeholder'

interface Props extends ComponentSearchArguments<any> {
}

const Query = graphql`
  query SuggestedClubsQuery($search: String) {
    ...SuggestedClubsFragment
    viewer {
      ...JoinClubButtonViewerFragment
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
    clubs (first: $first, after: $after, name: $search)
    @connection (key: "SuggestedClubs_clubs") {
      edges {
        node {
          slug
          ...JoinClubButtonClubFragment
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
    <EmptyBoundary
      fallback={
        <SmallBackgroundBox>
          <Trans>No clubs found</Trans>
        </SmallBackgroundBox>
    }
      condition={data.clubs.edges.length < 1}
    >
      <GridWrap>
        {data.clubs.edges.map((item, index) =>
          <Box key={index} h='100%'>
            <GridTile key={index}>
              <LinkTile to={`/${item.node.slug as string}`}>
                <ClubTileOverlay query={item.node} />
              </LinkTile>
            </GridTile>
            <Box mt={2}>
              <JoinClubButton
                w='100%'
                size='md'
                clubQuery={item.node}
                viewerQuery={queryData?.viewer}
              />
            </Box>
          </Box>)}
        <LoadMoreGridTile
          hasNext={hasNext}
          onLoadNext={() => loadNext(9)}
          isLoadingNext={isLoadingNext}
        />
      </GridWrap>
    </EmptyBoundary>
  )
}
