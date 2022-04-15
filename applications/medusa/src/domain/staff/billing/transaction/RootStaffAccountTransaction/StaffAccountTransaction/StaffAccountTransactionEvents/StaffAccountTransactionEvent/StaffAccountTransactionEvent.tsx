import { graphql, useFragment } from 'react-relay/hooks'
import type {
  StaffAccountTransactionEventFragment$key
} from '@//:artifacts/StaffAccountTransactionEventFragment.graphql'
import {
  TableBodyColumn,
  TableBodyColumnText,
  TableBodyRow,
  TableBodyRowBackground
} from '@//:modules/content/ThemeComponents/Table/Table'
import { useLingui } from '@lingui/react'
import { dateFnsLocaleFromI18n } from '@//:modules/locale'
import format from 'date-fns/format'
import { dateFormat } from '@//:modules/constants/format'
import displayPrice from '@//:modules/support/displayPrice'

interface Props {
  query: StaffAccountTransactionEventFragment$key
}

const Fragment = graphql`
  fragment StaffAccountTransactionEventFragment on AccountTransactionEvent {
    amount
    currency
    reason
    timestamp
  }
`

export default function StaffAccountTransactionEvent ({ query }: Props): JSX.Element {
  const data = useFragment(Fragment, query)

  const { i18n } = useLingui()
  const locale = dateFnsLocaleFromI18n(i18n)
  const timestamp = format(new Date(data.timestamp as Date), dateFormat, { locale })
  const price = displayPrice({
    amount: data.amount,
    currency: data.currency,
    locale: locale
  })

  return (
    <TableBodyRowBackground>
      <TableBodyRow columns={6}>
        <TableBodyColumnText column={2}>
          {price}
        </TableBodyColumnText>
        <TableBodyColumn column={2}>
          {data.reason}
        </TableBodyColumn>
        <TableBodyColumnText column={2}>
          {timestamp}
        </TableBodyColumnText>
      </TableBodyRow>
    </TableBodyRowBackground>
  )
}
