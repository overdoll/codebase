import { graphql, useFragment } from 'react-relay/hooks'
import { AdminTransactionCardFragment$key } from '@//:artifacts/AdminTransactionCardFragment.graphql'
import { TableBodyColumn, TableBodyColumnText, TableBodyRow } from '@//:modules/content/ThemeComponents/Table/Table'
import { useLingui } from '@lingui/react'
import { dateFnsLocaleFromI18n } from '@//:modules/locale'
import formatDistanceToNow from 'date-fns/formatDistanceToNow'
import displayPrice from '@//:modules/support/displayPrice'
import { Badge } from '@chakra-ui/react'

interface Props {
  query: AdminTransactionCardFragment$key
}

const Fragment = graphql`
  fragment AdminTransactionCardFragment on AccountTransaction {
    type
    timestamp
    amount
    currency
    clubSupporterSubscription {
      ...on IAccountClubSupporterSubscription{
        club {
          name
        }
      }
    }
  }
`

export default function AdminTransactionCard ({
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

  const getColorScheme = (): string => {
    switch (data.type) {
      case 'PAYMENT':
        return 'green'

      case 'CHARGEBACK':
        return 'orange'

      case 'REFUND':
        return 'purple'

      case 'VOID':
        return 'gray'

      default:
        return 'gray'
    }
  }

  return (
    <TableBodyRow columns={8}>
      <TableBodyColumn column={2}>
        <Badge colorScheme={getColorScheme()}>
          {data.type}
        </Badge>
      </TableBodyColumn>
      <TableBodyColumnText column={2}>
        {price}
      </TableBodyColumnText>
      <TableBodyColumnText column={2}>
        {data?.clubSupporterSubscription?.club?.name}
      </TableBodyColumnText>
      <TableBodyColumnText column={2}>
        {timestamp}
      </TableBodyColumnText>
    </TableBodyRow>
  )
}
