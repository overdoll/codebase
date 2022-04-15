import { graphql } from 'react-relay/hooks'
import { usePaginationFragment } from 'react-relay'
import {
  StaffAccountClubSupporterSubscriptionQuery
} from '@//:artifacts/StaffAccountClubSupporterSubscriptionQuery.graphql'
import {
  StaffExpiredSubscriptionTransactionsFragment$key
} from '@//:artifacts/StaffExpiredSubscriptionTransactionsFragment.graphql'
import StaffTransactionsList from '../StaffTransactionsList/StaffTransactionsList'

interface Props {
  query: StaffExpiredSubscriptionTransactionsFragment$key
}

const Fragment = graphql`
  fragment StaffExpiredSubscriptionTransactionsFragment on AccountExpiredClubSupporterSubscription
  @argumentDefinitions(
    first: {type: Int, defaultValue: 5}
    after: {type: String}
  )
  @refetchable(queryName: "StaffExpiredSubscriptionTransactionsFragmentPaginationQuery" ) {
    transactions (first: $first, after: $after)
    @connection(key: "StaffExpiredSubscriptionTransactions_transactions") {
      ...StaffTransactionsListFragment
      edges {
        __typename
      }
    }
  }
`

export default function StaffExpiredSubscriptionTransactions ({
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
