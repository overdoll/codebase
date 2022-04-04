import { graphql } from 'react-relay/hooks'
import { usePaginationFragment } from 'react-relay'
import {
  StaffAccountClubSupporterSubscriptionQuery
} from '@//:artifacts/StaffAccountClubSupporterSubscriptionQuery.graphql'
import {
  StaffActiveSubscriptionTransactionsFragment$key
} from '@//:artifacts/StaffActiveSubscriptionTransactionsFragment.graphql'
import StaffTransactionsList from '../StaffTransactionsList/StaffTransactionsList'

interface Props {
  query: StaffActiveSubscriptionTransactionsFragment$key
}

const Fragment = graphql`
  fragment StaffActiveSubscriptionTransactionsFragment on AccountActiveClubSupporterSubscription
  @argumentDefinitions(
    first: {type: Int, defaultValue: 5}
    after: {type: String}
  )
  @refetchable(queryName: "StaffActiveSubscriptionTransactionsFragmentPaginationQuery" ) {
    transactions (first: $first, after: $after)
    @connection(key: "StaffActiveSubscriptionTransactions_transactions") {
      ...StaffTransactionsListFragment
      edges {
        __typename
      }
    }
  }
`

export default function StaffActiveSubscriptionTransactions ({
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
