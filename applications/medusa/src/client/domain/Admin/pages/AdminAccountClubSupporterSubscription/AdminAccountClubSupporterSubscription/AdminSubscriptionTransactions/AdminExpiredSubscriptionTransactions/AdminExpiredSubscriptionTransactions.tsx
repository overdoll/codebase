import { graphql } from 'react-relay/hooks'
import { usePaginationFragment } from 'react-relay'
import {
  AdminAccountClubSupporterSubscriptionQuery
} from '@//:artifacts/AdminAccountClubSupporterSubscriptionQuery.graphql'
import {
  AdminExpiredSubscriptionTransactionsFragment$key
} from '@//:artifacts/AdminExpiredSubscriptionTransactionsFragment.graphql'
import AdminTransactionsList from '../../../../../components/AdminTransactionsList/AdminTransactionsList'

interface Props {
  query: AdminExpiredSubscriptionTransactionsFragment$key
}

const Fragment = graphql`
  fragment AdminExpiredSubscriptionTransactionsFragment on AccountExpiredClubSupporterSubscription
  @argumentDefinitions(
    first: {type: Int, defaultValue: 5}
    after: {type: String}
  )
  @refetchable(queryName: "AdminExpiredSubscriptionTransactionsFragmentPaginationQuery" ) {
    transactions (first: $first, after: $after)
    @connection(key: "AdminExpiredSubscriptionTransactions_transactions") {
      ...AdminTransactionsListFragment
      edges {
        __typename
      }
    }
  }
`

export default function AdminExpiredSubscriptionTransactions ({
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
