import { graphql, usePaginationFragment } from 'react-relay'
import { GridTile, GridWrap, LoadMoreGridTile } from '../../../../ContentSelection'
import { DiscoverClubsListFragment$key } from '@//:artifacts/DiscoverClubsListFragment.graphql'
import { EmptyBoundary, EmptyClubs } from '../../../../Placeholder'
import type { DiscoverClubsQuery } from '@//:artifacts/DiscoverClubsQuery.graphql'
import ClubJoinTile from './ClubJoinTile/ClubJoinTile'
import { Trans } from '@lingui/macro'

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
          id
          ...ClubJoinTileFragment
        }
      }
    }
    viewer {
      ...ClubJoinTileViewerFragment
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
            onLoadNext={() => loadNext(9)}
            isLoadingNext={isLoadingNext}
          />
        </GridWrap>
      </EmptyBoundary>
    </>
  )
}
