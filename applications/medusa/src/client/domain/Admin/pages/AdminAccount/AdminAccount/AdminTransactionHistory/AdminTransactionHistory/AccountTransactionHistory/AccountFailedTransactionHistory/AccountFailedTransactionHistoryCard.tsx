import { graphql, useFragment } from 'react-relay/hooks'
import {
  AccountFailedTransactionHistoryCardFragment$key
} from '@//:artifacts/AccountFailedTransactionHistoryCardFragment.graphql'
import { TableBodyColumn, TableBodyColumnText, TableBodyRow } from '@//:modules/content/ThemeComponents/Table/Table'
import { useLingui } from '@lingui/react'
import { dateFnsLocaleFromI18n } from '@//:modules/locale'
import { Trans } from '@lingui/macro'
import { Badge } from '@chakra-ui/react'
import formatDistanceToNow from 'date-fns/formatDistanceToNow'

interface Props {
  query: AccountFailedTransactionHistoryCardFragment$key
}

const Fragment = graphql`
  fragment AccountFailedTransactionHistoryCardFragment on AccountFailedTransactionHistory {
    timestamp
    supportedClub {
      name
    }
    ccbillErrorCode
  }

`

export default function AccountFailedTransactionHistoryCard ({
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
        <Badge colorScheme='orange'>
          <Trans>
            Failed
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
        {data.ccbillErrorCode}
      </TableBodyColumnText>
    </TableBodyRow>
  )
}
