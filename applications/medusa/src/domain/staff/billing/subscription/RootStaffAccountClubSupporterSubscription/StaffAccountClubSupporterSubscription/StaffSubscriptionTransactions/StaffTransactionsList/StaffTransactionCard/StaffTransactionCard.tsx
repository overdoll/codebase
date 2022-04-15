import { graphql, useFragment } from 'react-relay/hooks'
import { StaffTransactionCardFragment$key } from '@//:artifacts/StaffTransactionCardFragment.graphql'
import { TableBodyColumn, TableBodyColumnText, TableBodyRow } from '@//:modules/content/ThemeComponents/Table/Table'
import { useLingui } from '@lingui/react'
import { dateFnsLocaleFromI18n } from '@//:modules/locale'
import formatDistanceToNow from 'date-fns/formatDistanceToNow'
import displayPrice from '@//:modules/support/displayPrice'
import { Badge } from '@chakra-ui/react'

interface Props {
  query: StaffTransactionCardFragment$key
}

const Fragment = graphql`
  fragment StaffTransactionCardFragment on AccountTransaction {
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

export const getTransactionColorScheme = (type): string => {
  switch (type) {
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

export default function StaffTransactionCard ({
  query
}: Props): JSX.Element {
  const data = useFragment(Fragment, query)

  const { i18n } = useLingui()
  const locale = dateFnsLocaleFromI18n(i18n)
  const timestamp = formatDistanceToNow(new Date(data.timestamp as Date), {
    locale: locale,
    includeSeconds: true,
    addSuffix: true
  })
  const price = displayPrice({
    amount: data.amount,
    currency: data.currency,
    locale: locale
  })

  return (
    <TableBodyRow columns={8}>
      <TableBodyColumn column={2}>
        <Badge colorScheme={getTransactionColorScheme(data.type)}>
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
