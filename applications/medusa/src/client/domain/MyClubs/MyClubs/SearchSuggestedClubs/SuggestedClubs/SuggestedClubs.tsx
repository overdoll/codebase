import { graphql, usePaginationFragment } from 'react-relay'
import JoinClubButton from '../../../../ManageClub/components/JoinClubButton/JoinClubButton'
import {
  ClickableTile,
  ClubTileOverlay,
  GridTile,
  GridWrap,
  LoadMoreGridTile
} from '@//:modules/content/ContentSelection'
import { useLazyLoadQuery } from 'react-relay/hooks'
import { Trans } from '@lingui/macro'
import { Box } from '@chakra-ui/react'
import { Link } from '@//:modules/routing'
import { SmallBackgroundBox } from '@//:modules/content/PageLayout'
import { SuggestedClubsQuery } from '@//:artifacts/SuggestedClubsQuery.graphql'
import { QueryArguments } from '@//:types/hooks'

interface Props {
  queryArgs: QueryArguments
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
    first: {type: Int, defaultValue: 7}
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
  queryArgs
}: Props): JSX.Element {
  const queryData = useLazyLoadQuery<SuggestedClubsQuery>(
    Query,
    queryArgs.variables,
    queryArgs.options
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

  if (data.clubs.edges.length < 1) {
    return (
      <SmallBackgroundBox>
        <Trans>No clubs found</Trans>
      </SmallBackgroundBox>
    )
  }

  return (
    <GridWrap>
      {data.clubs.edges.map((item, index) =>
        <GridTile key={index}>
          <Link to={`/${item.node.slug as string}`}>
            {({ isPending }) => (
              <ClickableTile isPending={isPending}>
                <ClubTileOverlay query={item.node} />
              </ClickableTile>
            )}
          </Link>
          <Box mt={2}>
            <JoinClubButton
              w='100%'
              size='md'
              clubQuery={item.node}
              viewerQuery={queryData?.viewer}
            />
          </Box>
        </GridTile>)}
      <LoadMoreGridTile
        hasNext={hasNext}
        onLoadNext={() => loadNext(10)}
        isLoadingNext={isLoadingNext}
      />
    </GridWrap>
  )
}
