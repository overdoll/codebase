import { graphql } from 'react-relay/hooks'
import { usePaginationFragment } from 'react-relay'
import {
  AdminAccountClubSupporterSubscriptionQuery
} from '@//:artifacts/AdminAccountClubSupporterSubscriptionQuery.graphql'
import {
  AdminActiveSubscriptionTransactionsFragment$key
} from '@//:artifacts/AdminActiveSubscriptionTransactionsFragment.graphql'
import AdminTransactionsList from '../AdminTransactionsList/AdminTransactionsList'

interface Props {
  query: AdminActiveSubscriptionTransactionsFragment$key
}

const Fragment = graphql`
  fragment AdminActiveSubscriptionTransactionsFragment on AccountActiveClubSupporterSubscription
  @argumentDefinitions(
    first: {type: Int, defaultValue: 5}
    after: {type: String}
  )
  @refetchable(queryName: "AdminActiveSubscriptionTransactionsFragmentPaginationQuery" ) {
    transactions (first: $first, after: $after)
    @connection(key: "AdminActiveSubscriptionTransactions_transactions") {
      ...AdminTransactionsListFragment
      edges {
        __typename
      }
    }
  }
`

export default function AdminActiveSubscriptionTransactions ({
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
