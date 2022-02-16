import { graphql, useLazyLoadQuery } from 'react-relay/hooks'
import { usePaginationFragment } from 'react-relay'
import { AdminSearchAudiencesQuery } from '@//:artifacts/AdminSearchAudiencesQuery.graphql'
import { removeNode } from '@//:modules/support'
import { AudienceTileOverlay, LinkTile, LoadMoreStackTile, StackTile } from '@//:modules/content/ContentSelection'
import { QueryArguments } from '@//:types/hooks'
import { EmptyAudiences } from '@//:modules/content/Placeholder'
import { ListSpacer } from '@//:modules/content/PageLayout'

interface Props {
  queryArgs: QueryArguments
}

const Query = graphql`
  query AdminSearchAudiencesQuery($title: String) {
    ...AdminSearchAudiencesFragment
  }
`

const Fragment = graphql`
  fragment AdminSearchAudiencesFragment on Query
  @argumentDefinitions(
    first: {type: Int}
    after: {type: String}
  )
  @refetchable(queryName: "AdminSearchAudiencesPaginationFragment" )
  {
    audiences (
      first: $first,
      after: $after,
      title: $title
    ) @connection(key: "AdminAudiencesConnection_audiences")
    {
      edges {
        node {
          slug
          ...AudienceTileOverlayFragment
        }
      }
    }
  }
`

export default function AdminSearchAudiences ({ queryArgs }: Props): JSX.Element {
  const queryData = useLazyLoadQuery<AdminSearchAudiencesQuery>(
    Query,
    queryArgs.variables,
    queryArgs.options
  )

  const {
    data,
    loadNext,
    isLoadingNext,
    hasNext
  } = usePaginationFragment<AdminSearchAudiencesQuery, any>(
    Fragment,
    queryData
  )
  const audiences = removeNode(data.audiences.edges)

  if (audiences.length < 1) {
    return (
      <EmptyAudiences hint={queryArgs.variables.title} />
    )
  }

  return (
    <>
      <ListSpacer>
        {audiences.map((item, index) => (
          <StackTile key={index}>
            <LinkTile to={`/admin/audience/search/${item.slug as string}`}>
              <AudienceTileOverlay query={item} />
            </LinkTile>
          </StackTile>
        )
        )}
        <LoadMoreStackTile
          hasNext={hasNext}
          onLoadNext={() => loadNext(5)}
          isLoadingNext={isLoadingNext}
        />
      </ListSpacer>
    </>
  )
}
