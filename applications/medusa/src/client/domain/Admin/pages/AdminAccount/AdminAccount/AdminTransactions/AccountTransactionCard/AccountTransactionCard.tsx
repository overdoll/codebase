import { graphql, useFragment } from 'react-relay/hooks'
import { AccountTransactionCardFragment$key } from '@//:artifacts/AccountTransactionCardFragment.graphql'
import { TableBodyColumn, TableBodyColumnText, TableBodyRow } from '@//:modules/content/ThemeComponents/Table/Table'
import { useLingui } from '@lingui/react'
import { dateFnsLocaleFromI18n } from '@//:modules/locale'
import formatDistanceToNow from 'date-fns/formatDistanceToNow'
import displayPrice from '@//:modules/support/displayPrice'
import { Badge } from '@chakra-ui/react'

interface Props {
  query: AccountTransactionCardFragment$key
}

const Fragment = graphql`
  fragment AccountTransactionCardFragment on AccountTransaction {
    type
    timestamp
    amount
    currency
    clubSupporterSubscription {
      ...on AccountActiveClubSupporterSubscription{
        club {
          name
        }
      }
      ...on AccountCancelledClubSupporterSubscription{
        club {
          name
        }
      }
      ...on AccountExpiredClubSupporterSubscription{
        club {
          name
        }
      }
    }
  }
`

export default function AccountTransactionCard ({
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
        <Badge colorScheme='gray'>
          {data.type}
        </Badge>
      </TableBodyColumn>
      <TableBodyColumnText column={2}>
        {data?.clubSupporterSubscription?.club?.name}
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
