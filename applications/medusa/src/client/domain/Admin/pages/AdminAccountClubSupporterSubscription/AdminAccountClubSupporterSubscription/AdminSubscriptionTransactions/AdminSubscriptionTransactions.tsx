import { graphql } from 'react-relay/hooks'
import { usePaginationFragment } from 'react-relay'
import {
  AdminAccountClubSupporterSubscriptionQuery
} from '@//:artifacts/AdminAccountClubSupporterSubscriptionQuery.graphql'
import { AdminSubscriptionTransactionsFragment$key } from '@//:artifacts/AdminSubscriptionTransactionsFragment.graphql'
import AdminTransactionsList from '../../../../components/AdminTransactionsList/AdminTransactionsList'

interface Props {
  query: AdminSubscriptionTransactionsFragment$key
}

const Fragment = graphql`
  fragment AdminSubscriptionTransactionsFragment on IAccountClubSupporterSubscription
  @argumentDefinitions(
    first: {type: Int, defaultValue: 5}
    after: {type: String}
  )
  @refetchable(queryName: "AdminSubscriptionTransactionsFragmentPaginationQuery" ) {
    transactions (first: $first, after: $after)
    @connection(key: "AdminSubscriptionTransactionsFragment_transactions") {
      ...AdminTransactionsListFragment
      edges {
        __typename
      }
    }
  }
`

export default function AdminSubscriptionTransactions ({
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
