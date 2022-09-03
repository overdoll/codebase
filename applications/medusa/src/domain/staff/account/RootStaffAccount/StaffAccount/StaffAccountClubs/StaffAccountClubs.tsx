import { graphql, usePaginationFragment } from 'react-relay'
import { ClubTileOverlay, GridTile, GridWrap, LinkTile, LoadMoreGridTile } from '@//:modules/content/ContentSelection'
import { StaffAccountClubsFragment$key } from '@//:artifacts/StaffAccountClubsFragment.graphql'
import { EmptyBoundary, EmptyClubs } from '@//:modules/content/Placeholder'
import { StaffAccountQuery } from '@//:artifacts/StaffAccountQuery.graphql'

interface Props {
  query: StaffAccountClubsFragment$key
}

const Fragment = graphql`
  fragment StaffAccountClubsFragment on Account
  @argumentDefinitions(
    first: {type: Int, defaultValue: 11}
    after: {type: String}
  )
  @refetchable(queryName: "StaffAccountClubsPaginationQuery" ) {
    clubs (first: $first, after: $after)
    @connection (key: "StaffAccountClubs_clubs") {
      edges {
        node {
          id
          slug
          ...ClubTileOverlayFragment
        }
      }
    }
  }
`

export default function StaffAccountClubs ({
  query
}: Props): JSX.Element {
  const {
    data,
    loadNext,
    hasNext,
    isLoadingNext
  } = usePaginationFragment<StaffAccountQuery, any>(
    Fragment,
    query
  )

  return (
    <>
      <EmptyBoundary
        fallback={
          <EmptyClubs />
        }
        condition={data.clubs.edges.length < 1}
      >
        <GridWrap>
          {data.clubs.edges.map((item) =>
            <GridTile key={item.node.id}>
              <LinkTile href={`/staff/club/${item.node.slug as string}`}>
                <ClubTileOverlay query={item.node} />
              </LinkTile>
            </GridTile>)}
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
