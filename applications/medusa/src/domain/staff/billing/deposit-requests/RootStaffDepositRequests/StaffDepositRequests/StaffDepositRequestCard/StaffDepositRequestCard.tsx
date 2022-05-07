import { graphql, useFragment } from 'react-relay/hooks'
import { StaffDepositRequestCardFragment$key } from '@//:artifacts/StaffDepositRequestCardFragment.graphql'
import { TableBodyColumnText, TableBodyRow } from '@//:modules/content/ThemeComponents/Table/Table'
import { useLingui } from '@lingui/react'
import { dateFnsLocaleFromI18n } from '@//:modules/locale'
import { format } from 'date-fns'
import { dateFormatWithTime } from '@//:modules/constants/format'
import displayPrice from '@//:modules/support/displayPrice'

interface Props {
  query: StaffDepositRequestCardFragment$key
}

const Fragment = graphql`
  fragment StaffDepositRequestCardFragment on DepositRequest {
    totalAmount
    currency
    lastDateForDeposit
    payoutMethod
  }
`

export default function StaffDepositRequestCard ({ query }: Props): JSX.Element {
  const data = useFragment(Fragment, query)

  const { i18n } = useLingui()
  const locale = dateFnsLocaleFromI18n(i18n)

  return (
    <TableBodyRow columns={5}>
      <TableBodyColumnText column={2}>
        {displayPrice({
          amount: data.totalAmount,
          currency: data.currency,
          locale: locale
        })}
      </TableBodyColumnText>
      <TableBodyColumnText column={1}>
        {data.payoutMethod}
      </TableBodyColumnText>
      <TableBodyColumnText column={2}>
        {format(new Date(data.lastDateForDeposit as Date), dateFormatWithTime, { locale })}
      </TableBodyColumnText>
    </TableBodyRow>
  )
}
