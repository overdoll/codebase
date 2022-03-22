import { graphql } from 'react-relay/hooks'
import { usePaginationFragment } from 'react-relay'
import { AdminAccountQuery } from '@//:artifacts/AdminAccountQuery.graphql'
import { AdminTransactionsFragment$key } from '@//:artifacts/AdminTransactionsFragment.graphql'

import AdminTransactionsList from '../../../../components/AdminTransactionsList/AdminTransactionsList'
import { Stack } from '@chakra-ui/react'
import { Trans } from '@lingui/macro'
import TransactionCountBadge from './TransactionCountBadge/TransactionCountBadge'

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
    transactionsTotalCount
    transactionsPaymentCount
    transactionsChargebackCount
    transactionsRefundCount
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
    <Stack spacing={6}>
      <Stack spacing={1}>
        <TransactionCountBadge
          value={data.transactionsPaymentCount}
          text={(
            <Trans>
              Payment Transactions
            </Trans>)}
          colorScheme='green'
        />
        <TransactionCountBadge
          value={data.transactionsRefundCount}
          text={(
            <Trans>
              Refund Transactions
            </Trans>)}
          colorScheme='purple'
        />
        <TransactionCountBadge
          value={data.transactionsChargebackCount}
          text={(
            <Trans>
              Chargeback Transactions
            </Trans>)}
          colorScheme='orange'
        />
      </Stack>
      <AdminTransactionsList
        query={data.transactions}
        hasNext={hasNext}
        loadNext={() => loadNext(5)}
        isLoadingNext={isLoadingNext}
      />
    </Stack>
  )
}
