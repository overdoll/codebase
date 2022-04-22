import { graphql } from 'react-relay/hooks'
import { usePaginationFragment } from 'react-relay'
import {
  StaffAccountClubSupporterSubscriptionQuery
} from '@//:artifacts/StaffAccountClubSupporterSubscriptionQuery.graphql'
import {
  StaffCancelledSubscriptionTransactionsFragment$key
} from '@//:artifacts/StaffCancelledSubscriptionTransactionsFragment.graphql'
import StaffTransactionsList from '../StaffTransactionsList/StaffTransactionsList'

interface Props {
  query: StaffCancelledSubscriptionTransactionsFragment$key
}

const Fragment = graphql`
  fragment StaffCancelledSubscriptionTransactionsFragment on AccountCancelledClubSupporterSubscription
  @argumentDefinitions(
    first: {type: Int, defaultValue: 5}
    after: {type: String}
  )
  @refetchable(queryName: "StaffCancelledSubscriptionTransactionsFragmentPaginationQuery" ) {
    transactions (first: $first, after: $after)
    @connection(key: "StaffCancelledSubscriptionTransactions_transactions") {
      ...StaffTransactionsListFragment
      edges {
        __typename
      }
    }
  }
`

export default function StaffCancelledSubscriptionTransactions ({
  query
}: Props): JSX.Element {
  const {
    data,
    loadNext,
    hasNext,
    isLoadingNext
  } = usePaginationFragment<StaffAccountClubSupporterSubscriptionQuery, any>(
    Fragment,
    query
  )

  return (
    <StaffTransactionsList
      query={data.transactions}
      hasNext={hasNext}
      loadNext={() => loadNext(5)}
      isLoadingNext={isLoadingNext}
    />
  )
}
