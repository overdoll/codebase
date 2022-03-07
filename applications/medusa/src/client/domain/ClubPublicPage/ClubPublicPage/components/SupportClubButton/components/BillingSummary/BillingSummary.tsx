import type { BillingSummaryFragment$key } from '@//:artifacts/BillingSummaryFragment.graphql'
import { graphql } from 'react-relay'
import { useFragment } from 'react-relay/hooks'
import { Box, Center, Heading, Stack, Text } from '@chakra-ui/react'
import LargeClubHeader from '../../../../../../ManageClub/components/LargeClubHeader/LargeClubHeader'
import { LargeBackgroundBox } from '@//:modules/content/PageLayout'
import displayPrice from '../../helpers/displayPrice'
import { useLingui } from '@lingui/react'
import { dateFnsLocaleFromI18n } from '@//:modules/locale'
import { Trans } from '@lingui/macro'

interface Props {
  query: BillingSummaryFragment$key
  currency: string
}

interface PriceProps {
  currency: string
  amount: number
}

const Fragment = graphql`
  fragment BillingSummaryFragment on Club {
    supporterSubscriptionPrice {
      prices {
        currency
        amount
      }
    }
    ...LargeClubHeaderFragment
  }
`

export default function BillingSummary ({
  query,
  currency
}: Props): JSX.Element {
  const data = useFragment(Fragment, query)

  const { i18n } = useLingui()
  const locale = dateFnsLocaleFromI18n(i18n)

  const getPriceByCurrency = (currency): PriceProps => {
    return data.supporterSubscriptionPrice.prices.filter((item) => (
      item.currency === currency
    ))[0]
  }

  const currentPrice = getPriceByCurrency(currency)

  const price = displayPrice({
    amount: currentPrice.amount,
    currency: currentPrice.currency,
    locale: locale
  })

  return (
    <Stack spacing={4}>
      <Box>
        <LargeClubHeader query={data} />
        <Text fontSize='sm' color='gray.300'>
          <Trans>
            Your contribution directly supports this creator and unlocks access to their exclusive content.
          </Trans>
        </Text>
      </Box>
      <Box>
        <LargeBackgroundBox bg='gray.900'>
          <Center>
            <Heading fontSize='3xl' color='gray.00'>
              {price} per month
            </Heading>
          </Center>
        </LargeBackgroundBox>
        <Text fontSize='sm' color='gray.300'>
          <Trans>
            Billed every 30 days, starting from the day you subscribe. You can cancel at any time from your
            Subscriptions page, which is located in your Account Settings.
          </Trans>
        </Text>
      </Box>
    </Stack>
  )
}
