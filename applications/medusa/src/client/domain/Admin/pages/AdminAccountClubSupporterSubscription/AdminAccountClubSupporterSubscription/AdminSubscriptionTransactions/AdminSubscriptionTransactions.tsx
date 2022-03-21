import { graphql, useFragment } from 'react-relay/hooks'
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
  ) {
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
  const data = useFragment(
    Fragment,
    query
  )

  const hasNext = false
  const loadNext = (num): {} => {
    return {}
  }
  const isLoadingNext = false

  return (
    <AdminTransactionsList
      query={data.transactions}
      hasNext={hasNext}
      loadNext={() => loadNext(5)}
      isLoadingNext={isLoadingNext}
    />
  )
}
