import { graphql, useFragment } from 'react-relay/hooks'
import {
  AccountCancelledTransactionHistoryCardFragment$key
} from '@//:artifacts/AccountCancelledTransactionHistoryCardFragment.graphql'
import { TableBodyColumn, TableBodyColumnText, TableBodyRow } from '@//:modules/content/ThemeComponents/Table/Table'
import formatDistanceToNow from 'date-fns/formatDistanceToNow'
import { useLingui } from '@lingui/react'
import { dateFnsLocaleFromI18n } from '@//:modules/locale'
import { Trans } from '@lingui/macro'
import { Badge } from '@chakra-ui/react'

interface Props {
  query: AccountCancelledTransactionHistoryCardFragment$key
}

const Fragment = graphql`
  fragment AccountCancelledTransactionHistoryCardFragment on AccountCancelledTransactionHistory {
    timestamp
    supportedClub {
      name
    }
    ccbillReason
  }

`

export default function AccountCancelledTransactionHistoryCard ({
  query
}: Props): JSX.Element {
  const data = useFragment(Fragment, query)

  const { i18n } = useLingui()
  const locale = dateFnsLocaleFromI18n(i18n)
  const timestamp = formatDistanceToNow(new Date(data.timestamp as Date), {
    locale: locale,
    includeSeconds: true
  })

  return (
    <TableBodyRow columns={9}>
      <TableBodyColumn column={2}>
        <Badge colorScheme='purple'>
          <Trans>
            Cancelled
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
        {data.ccbillReason}
      </TableBodyColumnText>
    </TableBodyRow>
  )
}
