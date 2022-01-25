import type { SuggestedClubsFragment, SuggestedClubsFragment$key } from '@//:artifacts/SuggestedClubsFragment.graphql'
import type { SuggestedClubsViewerFragment$key } from '@//:artifacts/SuggestedClubsViewerFragment.graphql'
import { graphql, usePaginationFragment } from 'react-relay'
import JoinClubButton from '../../../ManageClub/components/JoinClubButton/JoinClubButton'
import { ClickableTile, GridTile, GridWrap, LoadMoreGridTile } from '../../../../../modules/content/ContentSelection'
import { useFragment } from 'react-relay/hooks'
import { MyClubsQuery } from '@//:artifacts/MyClubsQuery.graphql'
import { Trans } from '@lingui/macro'
import ClubTileOverlay
  from '../../../../../modules/content/ContentSelection/components/TileOverlay/ClubTileOverlay/ClubTileOverlay'
import { Box } from '@chakra-ui/react'
import { Link } from '@//:modules/routing'

interface Props {
  query: SuggestedClubsFragment$key | null
  viewerQuery: SuggestedClubsViewerFragment$key | null
}

interface ClubProps {
  node: SuggestedClubsFragment['clubs']['edges'][0]['node']
}

const Fragment = graphql`
  fragment SuggestedClubsFragment on Query
  @argumentDefinitions(
    first: {type: Int, defaultValue: 7}
    after: {type: String}
  )
  @refetchable(queryName: "SuggestedClubsPaginationQuery" ) {
    clubs (first: $first, after: $after)
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

const ViewerFragment = graphql`
  fragment SuggestedClubsViewerFragment on Account {
    ...JoinClubButtonViewerFragment
    clubMembershipsCount
  }
`

export default function SuggestedClubs ({
  query,
  viewerQuery
}: Props): JSX.Element {
  const {
    data,
    loadNext,
    hasNext,
    isLoadingNext
  } = usePaginationFragment<MyClubsQuery, any>(
    Fragment,
    query
  )

  const viewerData = useFragment(ViewerFragment, viewerQuery)

  const ClubItem = ({ node }: ClubProps): JSX.Element => {
    return (
      <>
        <Link to={`/${node.slug as string}`}>
          <ClickableTile>
            <ClubTileOverlay query={node} />
          </ClickableTile>
        </Link>
        <Box mt={2}>
          <JoinClubButton w='100%' size='md' clubQuery={node} viewerQuery={viewerData} />
        </Box>
      </>
    )
  }

  if (data.clubs.edges.length < 1) {
    return <Trans>No clubs found</Trans>
  }

  return (
    <GridWrap>
      {data.clubs.edges.map((item, index) =>
        <GridTile key={index}>
          <ClubItem node={item.node} />
        </GridTile>)}
      <LoadMoreGridTile
        hasNext={hasNext}
        onLoadNext={() => loadNext(10)}
        isLoadingNext={isLoadingNext}
      />
    </GridWrap>
  )
}
