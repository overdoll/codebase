import { graphql, useFragment } from 'react-relay/hooks'
import { ClubBalanceFragment$key } from '@//:artifacts/ClubBalanceFragment.graphql'
import displayPrice from '@//:modules/support/displayPrice'
import { useLingui } from '@lingui/react'
import { dateFnsLocaleFromI18n } from '@//:modules/locale'
import { Trans } from '@lingui/macro'
import { PayoutMethod } from '@//:assets/icons'
import StatisticHeader from '../../../../../../../../common/components/StatisticHeader/StatisticHeader'

interface Props {
  query: ClubBalanceFragment$key
}

const Fragment = graphql`
  fragment ClubBalanceFragment on Club {
    balance {
      amount
      currency
    }
  }
`

export default function ClubBalance ({ query }: Props): JSX.Element {
  const data = useFragment(Fragment, query)

  const { i18n } = useLingui()
  const locale = dateFnsLocaleFromI18n(i18n)

  const balance = displayPrice({
    amount: data.balance.amount,
    currency: data.balance.currency,
    locale: locale
  })

  return (
    <StatisticHeader
      icon={PayoutMethod}
      title={(
        <Trans>
          Balance
        </Trans>)}
    >
      {balance}
    </StatisticHeader>
  )
}
