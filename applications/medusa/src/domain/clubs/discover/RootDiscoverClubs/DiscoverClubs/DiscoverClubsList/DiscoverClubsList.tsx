import { graphql, usePaginationFragment } from 'react-relay'
import { GridTile, GridWrap, LoadMoreGridTile } from '@//:modules/content/ContentSelection'
import { DiscoverClubsListFragment$key } from '@//:artifacts/DiscoverClubsListFragment.graphql'
import { EmptyBoundary, EmptyClubs } from '@//:modules/content/Placeholder'
import type { DiscoverClubsQuery } from '@//:artifacts/DiscoverClubsQuery.graphql'
import ClubJoinTile from '../../../../../../common/components/ClubJoinTile/ClubJoinTile'
import { Trans } from '@lingui/macro'

interface Props {
  query: DiscoverClubsListFragment$key
}

const Fragment = graphql`
  fragment DiscoverClubsListFragment on Query
  @argumentDefinitions(
    first: {type: Int, defaultValue: 17}
    after: {type: String}
  )
  @refetchable(queryName: "DiscoverClubsPaginationQuery" ) {
    discoverClubs (first: $first, after: $after)
    @connection (key: "DiscoverClubs_discoverClubs") {
      edges {
        node {
          ...ClubJoinTileFragment
        }
      }
    }
    viewer {
      ...ClubJoinTileViewerFragment
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
        <GridWrap templateColumns='repeat(auto-fill, minmax(150px, 1fr))'>
          {data.discoverClubs.edges.map((item, index) =>
            <GridTile key={index}>
              <ClubJoinTile clubQuery={item.node} viewerQuery={data.viewer} />
            </GridTile>)}
          <LoadMoreGridTile
            text={<Trans>View More Clubs</Trans>}
            hasNext={hasNext}
            onLoadNext={() => loadNext(9)}
            isLoadingNext={isLoadingNext}
          />
        </GridWrap>
      </EmptyBoundary>
    </>
  )
}
