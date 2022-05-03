import { graphql, useFragment } from 'react-relay/hooks'
import { StaffClubPayoutCardFragment$key } from '@//:artifacts/StaffClubPayoutCardFragment.graphql'
import { TableBodyColumn, TableBodyColumnText, TableBodyRow } from '@//:modules/content/ThemeComponents/Table/Table'
import { Badge } from '@chakra-ui/react'
import { useLingui } from '@lingui/react'
import { dateFnsLocaleFromI18n } from '@//:modules/locale'
import { format } from 'date-fns'
import { dateFormatWithTime } from '@//:modules/constants/format'
import displayPrice from '@//:modules/support/displayPrice'

export const STATUS_COLORS = {
  CANCELLED: 'orange',
  DEPOSITED: 'green',
  FAILED: 'orange',
  PROCESSING: 'purple',
  QUEUED: 'purple'
}

interface Props {
  query: StaffClubPayoutCardFragment$key
}

const Fragment = graphql`
  fragment StaffClubPayoutCardFragment on ClubPayout {
    status
    amount
    currency
    depositDate
  }
`

export default function StaffClubPayoutCard ({ query }: Props): JSX.Element {
  const data = useFragment(Fragment, query)

  const { i18n } = useLingui()
  const locale = dateFnsLocaleFromI18n(i18n)

  return (
    <TableBodyRow columns={4}>
      <TableBodyColumn column={1}>
        <Badge colorScheme={STATUS_COLORS[data.status]}>
          {data.status}
        </Badge>
      </TableBodyColumn>
      <TableBodyColumnText column={1}>
        {displayPrice({
          amount: data.amount,
          currency: data.currency,
          locale: locale
        })}
      </TableBodyColumnText>
      <TableBodyColumnText column={2}>
        {format(new Date(data.depositDate as Date), dateFormatWithTime, { locale })}
      </TableBodyColumnText>
    </TableBodyRow>
  )
}
