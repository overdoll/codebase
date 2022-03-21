import { graphql } from 'react-relay/hooks'
import { usePaginationFragment } from 'react-relay'
import { AdminAccountQuery } from '@//:artifacts/AdminAccountQuery.graphql'
import { AdminTransactionsFragment$key } from '@//:artifacts/AdminTransactionsFragment.graphql'

import AdminTransactionsList from '../../../../components/AdminTransactionsList/AdminTransactionsList'

interface Props {
  query: AdminTransactionsFragment$key
}

const Fragment = graphql`
  fragment AdminTransactionsFragment on Account
  @argumentDefinitions(
    first: {type: Int, defaultValue: 5}
    after: {type: String}
  )
  @refetchable(queryName: "AdminTransactionsPaginationQuery" ) {
    transactions (first: $first, after: $after)
    @connection(key: "AdminTransactions_transactions") {
      ...AdminTransactionsListFragment
      edges {
        __typename
      }
    }
  }
`

export default function AdminTransactions ({
  query
}: Props): JSX.Element {
  const {
    data,
    loadNext,
    hasNext,
    isLoadingNext
  } = usePaginationFragment<AdminAccountQuery, any>(
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
