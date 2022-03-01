import { graphql, useLazyLoadQuery } from 'react-relay/hooks'
import { usePaginationFragment } from 'react-relay'
import {
  AdminSearchAudiencesQuery,
  AdminSearchAudiencesQuery$variables
} from '@//:artifacts/AdminSearchAudiencesQuery.graphql'
import { removeNode } from '@//:modules/support'
import { AudienceTileOverlay, LinkTile, LoadMoreStackTile, StackTile } from '@//:modules/content/ContentSelection'
import { EmptyAudiences, EmptyBoundary } from '@//:modules/content/Placeholder'
import { ListSpacer } from '@//:modules/content/PageLayout'
import { ComponentSearchArguments } from '@//:modules/content/HookedComponents/Search/types'

interface Props extends ComponentSearchArguments<AdminSearchAudiencesQuery$variables> {
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

export default function AdminSearchAudiences ({ searchArguments }: Props): JSX.Element {
  const queryData = useLazyLoadQuery<AdminSearchAudiencesQuery>(
    Query,
    searchArguments.variables,
    searchArguments.options
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

  return (
    <EmptyBoundary
      fallback={<EmptyAudiences hint={searchArguments.variables.title} />}
      condition={audiences.length < 1}
    >
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
    </EmptyBoundary>
  )
}
