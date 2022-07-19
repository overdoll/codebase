import type { ClubSupporterSubscriptionPriceButtonFragment$key } from '@//:artifacts/ClubSupporterSubscriptionPriceButtonFragment.graphql'
import { graphql } from 'react-relay'
import { useFragment } from 'react-relay/hooks'
import { Icon } from '@//:modules/content/PageLayout'
import { PremiumStar } from '@//:assets/icons'
import displayPrice from '@//:modules/support/displayPrice'
import { useLingui } from '@lingui/react'
import { dateFnsLocaleFromI18n } from '@//:modules/locale'
import Button from '@//:modules/form/Button/Button'
import { Trans } from '@lingui/macro'
import { forwardRef } from 'react'
import { ButtonProps } from '@chakra-ui/react'

interface Props extends ButtonProps {
  query: ClubSupporterSubscriptionPriceButtonFragment$key
}

const Fragment = graphql`
  fragment ClubSupporterSubscriptionPriceButtonFragment on Club {
    supporterSubscriptionPrice {
      localizedPrice {
        amount
        currency
      }
    }
  }
`

export const SUPPORT_BUTTON_PROPS = {
  colorScheme: 'orange',
  size: 'lg',
  w: '100%',
  leftIcon: (
    <Icon
      icon={PremiumStar}
      fill='orange.900'
      h={4}
      w={4}
    />)
}

const ClubSupporterSubscriptionPriceButton = forwardRef<any, Props>(({
  query,
  ...rest
}: Props, forwardRef): JSX.Element => {
  const data = useFragment(Fragment, query)

  const { i18n } = useLingui()
  const locale = dateFnsLocaleFromI18n(i18n)

  const price = displayPrice({
    amount: data.supporterSubscriptionPrice.localizedPrice.amount,
    currency: data.supporterSubscriptionPrice.localizedPrice.currency,
    locale: locale
  })

  return (
    <Button
      ref={forwardRef}
      {...SUPPORT_BUTTON_PROPS}
      {...rest}
    >
      <Trans>
        Become a Supporter {price}
      </Trans>
    </Button>
  )
})

export default ClubSupporterSubscriptionPriceButton
