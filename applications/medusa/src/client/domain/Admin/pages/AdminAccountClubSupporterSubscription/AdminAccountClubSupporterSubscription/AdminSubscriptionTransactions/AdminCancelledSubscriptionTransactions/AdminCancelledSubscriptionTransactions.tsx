import { graphql } from 'react-relay/hooks'
import { usePaginationFragment } from 'react-relay'
import {
  AdminAccountClubSupporterSubscriptionQuery
} from '@//:artifacts/AdminAccountClubSupporterSubscriptionQuery.graphql'
import {
  AdminCancelledSubscriptionTransactionsFragment$key
} from '@//:artifacts/AdminCancelledSubscriptionTransactionsFragment.graphql'
import AdminTransactionsList from '../../../../../components/AdminTransactionsList/AdminTransactionsList'

interface Props {
  query: AdminCancelledSubscriptionTransactionsFragment$key
}

const Fragment = graphql`
  fragment AdminCancelledSubscriptionTransactionsFragment on AccountCancelledClubSupporterSubscription
  @argumentDefinitions(
    first: {type: Int, defaultValue: 5}
    after: {type: String}
  )
  @refetchable(queryName: "AdminCancelledSubscriptionTransactionsFragmentPaginationQuery" ) {
    transactions (first: $first, after: $after)
    @connection(key: "AdminCancelledSubscriptionTransactions_transactions") {
      ...AdminTransactionsListFragment
      edges {
        __typename
      }
    }
  }
`

export default function AdminCancelledSubscriptionTransactions ({
  query
}: Props): JSX.Element {
  const {
    data,
    loadNext,
    hasNext,
    isLoadingNext
  } = usePaginationFragment<AdminAccountClubSupporterSubscriptionQuery, any>(
    Fragment,
    query
  )

  return (
    <AdminTransactionsList
      query={data.transactions}
      hasNext={hasNext}
      loadNext={() => loadNext(5)}
      isLoadingNext={isLoadingNext}
    />
  )
}
