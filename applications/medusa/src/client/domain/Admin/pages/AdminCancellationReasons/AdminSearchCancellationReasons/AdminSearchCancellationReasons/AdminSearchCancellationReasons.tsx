import { graphql, useLazyLoadQuery } from 'react-relay/hooks'
import { usePaginationFragment } from 'react-relay'
import { AdminSearchCancellationReasonsQuery } from '@//:artifacts/AdminSearchCancellationReasonsQuery.graphql'
import { removeNode } from '@//:modules/support'
import {
  CancellationReasonOverlay,
  LinkTile,
  LoadMoreStackTile,
  StackTile
} from '@//:modules/content/ContentSelection'
import { EmptyBoundary, EmptyGeneralSearch } from '@//:modules/content/Placeholder'
import { ListSpacer } from '@//:modules/content/PageLayout'
import { ComponentSearchArguments } from '@//:modules/content/HookedComponents/Search/types'

interface Props extends ComponentSearchArguments<any> {
}

const Query = graphql`
  query AdminSearchCancellationReasonsQuery {
    ...AdminSearchCancellationReasonsFragment
  }
`

const Fragment = graphql`
  fragment AdminSearchCancellationReasonsFragment on Query
  @argumentDefinitions(
    first: {type: Int}
    after: {type: String}
  )
  @refetchable(queryName: "AdminSearchCancellationReasonsPaginationFragment" )
  {
    cancellationReasons (
      first: $first,
      after: $after,
    ) @connection(key: "AdminCancellationReasonsConnection_cancellationReasons")
    {
      edges {
        node {
          id
          ...CancellationReasonOverlayFragment
        }
      }
    }
  }
`

export default function AdminSearchCancellationReasons ({ searchArguments }: Props): JSX.Element {
  const queryData = useLazyLoadQuery<AdminSearchCancellationReasonsQuery>(
    Query,
    searchArguments.variables,
    searchArguments.options
  )

  const {
    data,
    loadNext,
    isLoadingNext,
    hasNext
  } = usePaginationFragment<AdminSearchCancellationReasonsQuery, any>(
    Fragment,
    queryData
  )
  const cancellationReasons = removeNode(data.cancellationReasons.edges)

  return (
    <EmptyBoundary
      fallback={<EmptyGeneralSearch />}
      condition={cancellationReasons.length < 1}
    >
      <ListSpacer>
        {cancellationReasons.map((item, index) => (
          <StackTile key={index}>
            <LinkTile to={`/admin/cancellation-reason/search/${item.id as string}`}>
              <CancellationReasonOverlay query={item} />
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
