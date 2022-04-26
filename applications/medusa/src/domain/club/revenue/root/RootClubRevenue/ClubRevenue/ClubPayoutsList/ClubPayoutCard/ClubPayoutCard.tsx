import { graphql, useFragment } from 'react-relay/hooks'
import { ClubPayoutCardFragment$key } from '@//:artifacts/ClubPayoutCardFragment.graphql'
import { useLingui } from '@lingui/react'
import { dateFnsLocaleFromI18n } from '@//:modules/locale'
import displayPrice from '@//:modules/support/displayPrice'

interface Props {
  query: ClubPayoutCardFragment$key
}

const Fragment = graphql`
  fragment ClubPayoutCardFragment on ClubPayout {
    amount
    currency
    status
    depositDate
  }
`

export default function ClubPayoutCard ({ query }: Props): JSX.Element {
  const data = useFragment(Fragment, query)

  const { i18n } = useLingui()
  const locale = dateFnsLocaleFromI18n(i18n)

  const amount = displayPrice({
    amount: data.amount,
    currency: data.currency,
    locale: locale
  })

  return (
    <>{amount}</>
  )
}
