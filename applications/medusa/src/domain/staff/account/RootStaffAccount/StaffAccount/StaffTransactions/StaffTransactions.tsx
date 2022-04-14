import { graphql } from 'react-relay/hooks'
import { usePaginationFragment } from 'react-relay'
import { StaffAccountQuery } from '@//:artifacts/StaffAccountQuery.graphql'
import { StaffTransactionsFragment$key } from '@//:artifacts/StaffTransactionsFragment.graphql'

import StaffTransactionsList
  from '../../../../../_toMigrate/Staff/pages/StaffAccountClubSupporterSubscription/StaffAccountClubSupporterSubscription/StaffSubscriptionTransactions/StaffTransactionsList/StaffTransactionsList'
import { Stack } from '@chakra-ui/react'
import { Trans } from '@lingui/macro'
import TransactionCountBadge from './TransactionCountBadge/TransactionCountBadge'

interface Props {
  query: StaffTransactionsFragment$key
}

const Fragment = graphql`
  fragment StaffTransactionsFragment on Account
  @argumentDefinitions(
    first: {type: Int, defaultValue: 5}
    after: {type: String}
  )
  @refetchable(queryName: "StaffTransactionsPaginationQuery" ) {
    transactions (first: $first, after: $after)
    @connection(key: "StaffTransactions_transactions") {
      ...StaffTransactionsListFragment
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

export default function StaffTransactions ({
  query
}: Props): JSX.Element {
  const {
    data,
    loadNext,
    hasNext,
    isLoadingNext
  } = usePaginationFragment<StaffAccountQuery, any>(
    Fragment,
    query
  )

  return (
    <Stack spacing={6}>
      {data.transactionsPaymentCount > 0 && (
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
      )}
      <StaffTransactionsList
        query={data.transactions}
        hasNext={hasNext}
        loadNext={() => loadNext(5)}
        isLoadingNext={isLoadingNext}
      />
    </Stack>
  )
}
