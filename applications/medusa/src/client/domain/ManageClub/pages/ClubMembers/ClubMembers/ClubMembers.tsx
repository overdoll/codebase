import { graphql, PreloadedQuery, usePreloadedQuery } from 'react-relay/hooks'
import { ClubMembersQuery } from '@//:artifacts/ClubMembersQuery.graphql'
import { GridTile, GridWrap, LoadMoreGridTile } from '../../../../../../modules/content/ContentSelection'
import { Text } from '@chakra-ui/react'
import { usePaginationFragment } from 'react-relay'
import { Trans } from '@lingui/macro'
import AccountTileOverlay
  from '../../../../../../modules/content/ContentSelection/TileOverlay/AccountTileOverlay/AccountTileOverlay'
import { NotFoundClub } from '@//:modules/content/Placeholder'
import { LinkTile } from '@//:modules/content/ContentSelection'

interface Props {
  query: PreloadedQuery<ClubMembersQuery>
}

const Query = graphql`
  query ClubMembersQuery($slug: String!) {
    club(slug: $slug) {
      ...ClubMembersFragment
    }
  }
`

const Fragment = graphql`
  fragment ClubMembersFragment on Club
  @argumentDefinitions(
    first: {type: Int, defaultValue: 20}
    after: {type: String}
  )
  @refetchable(queryName: "ClubMembersPaginationQuery" ) {
    members (first: $first, after: $after)
    @connection (key: "ClubMembers_members") {
      edges {
        node {
          account {
            username
            ...AccountTileOverlayFragment
          }
        }
      }
    }
  }
`

export default function ClubMembers ({ query }: Props): JSX.Element {
  const queryData = usePreloadedQuery<ClubMembersQuery>(
    Query,
    query
  )

  const {
    data,
    loadNext,
    hasNext,
    isLoadingNext
  } = usePaginationFragment<ClubMembersQuery, any>(
    Fragment,
    queryData.club
  )

  if (queryData?.club == null) {
    return <NotFoundClub />
  }

  if (data.members.edges.length < 1) {
    return (
      <Text>
        <Trans>
          No members found
        </Trans>
      </Text>
    )
  }

  return (
    <GridWrap justify='flex-start'>
      {data.members.edges.map((item, index) =>
        <GridTile key={index}>
          <LinkTile to={`/m/${item.node.account.username as string}`}>
            <AccountTileOverlay query={item.node.account} />
          </LinkTile>
        </GridTile>
      )}
      <LoadMoreGridTile
        hasNext={hasNext}
        onLoadNext={() => loadNext(20)}
        isLoadingNext={isLoadingNext}
      />
    </GridWrap>
  )
}
