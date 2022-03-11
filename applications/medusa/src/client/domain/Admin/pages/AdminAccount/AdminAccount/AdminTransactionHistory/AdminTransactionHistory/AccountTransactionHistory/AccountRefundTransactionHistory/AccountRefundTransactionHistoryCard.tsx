import { graphql, useFragment } from 'react-relay/hooks'
import {
  AccountRefundTransactionHistoryCardFragment$key
} from '@//:artifacts/AccountRefundTransactionHistoryCardFragment.graphql'
import { TableBodyColumn, TableBodyColumnText, TableBodyRow } from '@//:modules/content/ThemeComponents/Table/Table'
import { useLingui } from '@lingui/react'
import { dateFnsLocaleFromI18n } from '@//:modules/locale'
import { Trans } from '@lingui/macro'
import { Badge } from '@chakra-ui/react'
import formatDistanceToNow from 'date-fns/formatDistanceToNow'
import displayPrice from '@//:modules/support/displayPrice'

interface Props {
  query: AccountRefundTransactionHistoryCardFragment$key
}

const Fragment = graphql`
  fragment AccountRefundTransactionHistoryCardFragment on AccountRefundTransactionHistory {
    timestamp
    supportedClub {
      name
    }
    amount
    currency
  }
`

export default function AccountRefundTransactionHistoryCard
({
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
        <Badge colorScheme='orange'>
          <Trans>
            Refund
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
