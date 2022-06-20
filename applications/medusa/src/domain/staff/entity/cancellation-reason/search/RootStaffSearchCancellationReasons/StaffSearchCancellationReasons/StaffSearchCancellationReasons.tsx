import { graphql, useLazyLoadQuery } from 'react-relay/hooks'
import { usePaginationFragment } from 'react-relay'
import { StaffSearchCancellationReasonsQuery } from '@//:artifacts/StaffSearchCancellationReasonsQuery.graphql'
import removeNode from '@//:modules/support/removeNode'
import { CancellationReasonOverlay, LinkTile, LoadMoreStackTile, StackTile } from '@//:modules/content/ContentSelection'
import { EmptyBoundary, EmptyGeneralSearch } from '@//:modules/content/Placeholder'
import { ComponentSearchArguments } from '@//:modules/content/HookedComponents/Search/types'
import { Stack } from '@chakra-ui/react'

interface Props extends ComponentSearchArguments<any> {
}

const Query = graphql`
  query StaffSearchCancellationReasonsQuery {
    ...StaffSearchCancellationReasonsFragment
  }
`

const Fragment = graphql`
  fragment StaffSearchCancellationReasonsFragment on Query
  @argumentDefinitions(
    first: {type: Int}
    after: {type: String}
  )
  @refetchable(queryName: "StaffSearchCancellationReasonsPaginationFragment" )
  {
    cancellationReasons (
      first: $first,
      after: $after,
    ) @connection(key: "StaffCancellationReasonsConnection_cancellationReasons")
    {
      edges {
        node {
          reference
          ...CancellationReasonOverlayFragment
        }
      }
    }
  }
`

export default function StaffSearchCancellationReasons ({ searchArguments }: Props): JSX.Element {
  const queryData = useLazyLoadQuery<StaffSearchCancellationReasonsQuery>(
    Query,
    searchArguments.variables,
    searchArguments.options
  )

  const {
    data,
    loadNext,
    isLoadingNext,
    hasNext
  } = usePaginationFragment<StaffSearchCancellationReasonsQuery, any>(
    Fragment,
    queryData
  )
  const cancellationReasons = removeNode(data.cancellationReasons.edges)

  return (
    <EmptyBoundary
      fallback={<EmptyGeneralSearch />}
      condition={cancellationReasons.length < 1}
    >
      <Stack spacing={2}>
        {cancellationReasons.map((item, index) => (
          <StackTile minH={10} key={index}>
            <LinkTile href={{
              pathname: '/staff/entity/cancellation-reason/[reference]',
              query: { reference: item.reference }
            }}
            >
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
      </Stack>
    </EmptyBoundary>
  )
}
