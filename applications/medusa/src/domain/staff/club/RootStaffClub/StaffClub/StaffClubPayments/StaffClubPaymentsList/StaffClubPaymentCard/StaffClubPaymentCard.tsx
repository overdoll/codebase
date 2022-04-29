import { graphql, useFragment } from 'react-relay/hooks'
import { StaffClubPaymentCardFragment$key } from '@//:artifacts/StaffClubPaymentCardFragment.graphql'
import { TableBodyColumn, TableBodyColumnText, TableBodyRow } from '@//:modules/content/ThemeComponents/Table/Table'
import { Badge } from '@chakra-ui/react'
import { useLingui } from '@lingui/react'
import { dateFnsLocaleFromI18n } from '@//:modules/locale'
import { format } from 'date-fns'
import { dateFormatWithTime } from '@//:modules/constants/format'
import displayPrice from '@//:modules/support/displayPrice'

export const STATUS_COLORS = {
  COMPLETE: 'green',
  PENDING: 'orange',
  READY: 'purple'
}

interface Props {
  query: StaffClubPaymentCardFragment$key
}

const Fragment = graphql`
  fragment StaffClubPaymentCardFragment on ClubPayment {
    status
    currency
    finalAmount
    settlementDate
  }
`

export default function StaffClubPaymentCard ({ query }: Props): JSX.Element {
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
          amount: data.finalAmount,
          currency: data.currency,
          locale: locale
        })}
      </TableBodyColumnText>
      <TableBodyColumnText column={2}>
        {format(new Date(data.settlementDate as Date), dateFormatWithTime, { locale })}
      </TableBodyColumnText>
    </TableBodyRow>
  )
}
