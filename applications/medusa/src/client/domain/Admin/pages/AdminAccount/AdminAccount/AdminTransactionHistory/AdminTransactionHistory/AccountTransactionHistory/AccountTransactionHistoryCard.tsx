import { graphql, useFragment } from 'react-relay/hooks'
import { AccountTransactionHistoryCardFragment$key } from '@//:artifacts/AccountTransactionHistoryCardFragment.graphql'
import AccountCancelledTransactionHistoryCard
  from './AccountCancelledTransactionHistory/AccountCancelledTransactionHistoryCard'
import AccountChargebackTransactionHistoryCard
  from './AccountChargebackTransactionHistory/AccountChargebackTransactionHistoryCard'
import AccountExpiredTransactionHistoryCard
  from './AccountExpiredTransactionHistory/AccountExpiredTransactionHistoryCard'
import AccountFailedTransactionHistoryCard from './AccountFailedTransactionHistory/AccountFailedTransactionHistoryCard'
import { TableBodyColumnText, TableBodyRow } from '@//:modules/content/ThemeComponents/Table/Table'
import { Trans } from '@lingui/macro'
import AccountInvoiceTransactionHistoryCard
  from './AccountInvoiceTransactionHistory/AccountInvoiceTransactionHistoryCard'
import AccountNewTransactionHistoryCard from './AccountNewTransactionHistory/AccountNewTransactionHistoryCard'
import AccountRefundTransactionHistoryCard from './AccountRefundTransactionHistory/AccountRefundTransactionHistoryCard'
import AccountVoidTransactionHistoryCard from './AccountVoidTransactionHistory/AccountVoidTransactionHistoryCard'
import AccountReactivatedTransactionHistoryCard
  from './AccountReactivatedTransactionHistory/AccountReactivatedTransactionHistoryCard'

interface Props {
  query: AccountTransactionHistoryCardFragment$key
}

const Fragment = graphql`
  fragment AccountTransactionHistoryCardFragment on AccountTransactionHistory {
    __typename
    ...on AccountCancelledTransactionHistory {
      ...AccountCancelledTransactionHistoryCardFragment
    }
    ...on AccountChargebackTransactionHistory {
      ...AccountChargebackTransactionHistoryCardFragment
    }
    ...on AccountExpiredTransactionHistory {
      ...AccountExpiredTransactionHistoryCardFragment
    }
    ...on AccountFailedTransactionHistory {
      ...AccountFailedTransactionHistoryCardFragment
    }
    ...on AccountInvoiceTransactionHistory {
      ...AccountInvoiceTransactionHistoryCardFragment
    }
    ...on AccountNewTransactionHistory {
      ...AccountNewTransactionHistoryCardFragment
    }
    ...on AccountReactivatedTransactionHistory {
      ...AccountReactivatedTransactionHistoryCardFragment
    }
    ...on AccountRefundTransactionHistory {
      ...AccountRefundTransactionHistoryCardFragment
    }
    ...on AccountVoidTransactionHistory {
      ...AccountVoidTransactionHistoryCardFragment
    }
  }

`

export default function AccountTransactionHistoryCard ({
  query
}: Props): JSX.Element {
  const data = useFragment(Fragment, query)

  switch (data.__typename) {
    case 'AccountCancelledTransactionHistory':
      return (
        <AccountCancelledTransactionHistoryCard query={data} />
      )
    case 'AccountChargebackTransactionHistory':
      return (
        <AccountChargebackTransactionHistoryCard query={data} />
      )
    case 'AccountExpiredTransactionHistory':
      return (
        <AccountExpiredTransactionHistoryCard query={data} />
      )
    case 'AccountFailedTransactionHistory':
      return (
        <AccountFailedTransactionHistoryCard query={data} />
      )
    case 'AccountInvoiceTransactionHistory':
      return (
        <AccountInvoiceTransactionHistoryCard query={data} />
      )
    case 'AccountNewTransactionHistory':
      return (
        <AccountNewTransactionHistoryCard query={data} />
      )
    case 'AccountReactivatedTransactionHistory':
      return (
        <AccountReactivatedTransactionHistoryCard query={data} />
      )
    case 'AccountRefundTransactionHistory':
      return (
        <AccountRefundTransactionHistoryCard query={data} />
      )
    case 'AccountVoidTransactionHistory':
      return (
        <AccountVoidTransactionHistoryCard query={data} />
      )
    default:
      return (
        <TableBodyRow columns={9}>
          <TableBodyColumnText column={9}>
            <Trans>
              Unsupported transaction {data.__typename}
            </Trans>
          </TableBodyColumnText>
        </TableBodyRow>
      )
  }
}
