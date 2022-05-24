import { graphql, useFragment } from 'react-relay/hooks'
import { StaffTransactionCardFragment$key } from '@//:artifacts/StaffTransactionCardFragment.graphql'
import { TableBodyColumn, TableBodyColumnText, TableBodyRow } from '@//:modules/content/ThemeComponents/Table/Table'
import { useLingui } from '@lingui/react'
import { dateFnsLocaleFromI18n } from '@//:modules/locale'
import displayPrice from '@//:modules/support/displayPrice'
import { Badge } from '@chakra-ui/react'
import { format } from 'date-fns'
import { dateFormatWithTime } from '@//:modules/constants/format'

interface Props {
  query: StaffTransactionCardFragment$key
}

const Fragment = graphql`
  fragment StaffTransactionCardFragment on AccountTransaction {
    type
    amount
    currency
    createdAt
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
  const timestamp = format(new Date(data.createdAt as Date), dateFormatWithTime, { locale })
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
