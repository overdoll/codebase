import { graphql } from 'react-relay/hooks'
import type { ClubPayoutPaymentsListFragment$key } from '@//:artifacts/ClubPayoutPaymentsListFragment.graphql'
import { EmptyBoundary, EmptyPayments } from '@//:modules/content/Placeholder'
import { usePaginationFragment } from 'react-relay'
import { StaffPayoutQuery } from '@//:artifacts/StaffPayoutQuery.graphql'
import ClubPaymentCard from '../../../../payments/RootClubPayments/ClubPayments/ClubPaymentCard/ClubPaymentCard'
import { LoadMoreStackTile } from '@//:modules/content/ContentSelection'
import { Stack } from '@chakra-ui/react'

interface Props {
  query: ClubPayoutPaymentsListFragment$key
}

const Fragment = graphql`
  fragment ClubPayoutPaymentsListFragment on ClubPayout
  @argumentDefinitions(
    first: {type: Int, defaultValue: 5}
    after: {type: String}
  )
  @refetchable(queryName: "ClubPayoutPaymentsPaginationQuery" ) {
    payments (first: $first, after: $after)
    @connection(key: "ClubPayoutPayments_payments") {
      edges {
        node {
          id
          reference
          ...ClubPaymentCardFragment
        }
      }
    }
  }
`

export default function ClubPayoutPaymentsList ({ query }: Props): JSX.Element {
  const {
    data,
    loadNext,
    hasNext,
    isLoadingNext
  } = usePaginationFragment<StaffPayoutQuery, any>(
    Fragment,
    query
  )

  return (
    <EmptyBoundary
      fallback={<EmptyPayments />}
      condition={data.payments.edges.length < 1}
    >
      <Stack spacing={2}>
        {data.payments.edges.map((item) => <ClubPaymentCard key={item.node.id} query={item.node} />)}
        <LoadMoreStackTile
          hasNext={hasNext}
          onLoadNext={() => loadNext(5)}
          isLoadingNext={isLoadingNext}
        />
      </Stack>
    </EmptyBoundary>
  )
}
