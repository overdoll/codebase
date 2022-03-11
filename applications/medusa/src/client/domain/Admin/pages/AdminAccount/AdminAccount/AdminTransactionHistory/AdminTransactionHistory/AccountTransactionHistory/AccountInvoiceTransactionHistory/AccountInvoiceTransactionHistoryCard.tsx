import { graphql, useFragment } from 'react-relay/hooks'
import {
  AccountInvoiceTransactionHistoryCardFragment$key
} from '@//:artifacts/AccountInvoiceTransactionHistoryCardFragment.graphql'
import { TableBodyColumn, TableBodyColumnText, TableBodyRow } from '@//:modules/content/ThemeComponents/Table/Table'
import { useLingui } from '@lingui/react'
import { dateFnsLocaleFromI18n } from '@//:modules/locale'
import { Trans } from '@lingui/macro'
import { Badge } from '@chakra-ui/react'
import displayPrice from '@//:modules/support/displayPrice'
import formatDistanceToNow from 'date-fns/formatDistanceToNow'

interface Props {
  query: AccountInvoiceTransactionHistoryCardFragment$key
}

const Fragment = graphql`
  fragment AccountInvoiceTransactionHistoryCardFragment on AccountInvoiceTransactionHistory {
    timestamp
    supportedClub {
      name
    }
    amount
    currency
  }

`

export default function AccountInvoiceTransactionHistoryCard ({
  query
}: Props): JSX.Element {
  const data = useFragment(Fragment, query)

  const { i18n } = useLingui()
  const locale = dateFnsLocaleFromI18n(i18n)
  const timestamp = formatDistanceToNow(new Date(data.timestamp as Date), {
    locale: locale,
    includeSeconds: true
  })
  const price = displayPrice({
    amount: data.amount,
    currency: data.currency,
    locale: locale
  })
  return (
    <TableBodyRow columns={9}>
      <TableBodyColumn column={2}>
        <Badge colorScheme='green'>
          <Trans>
            Invoice
          </Trans>
        </Badge>
      </TableBodyColumn>
      <TableBodyColumnText column={2}>
        {data?.supportedClub?.name}
      </TableBodyColumnText>
      <TableBodyColumnText column={2}>
        {timestamp}
      </TableBodyColumnText>
      <TableBodyColumnText column={3}>
        {price}
      </TableBodyColumnText>
    </TableBodyRow>
  )
}
