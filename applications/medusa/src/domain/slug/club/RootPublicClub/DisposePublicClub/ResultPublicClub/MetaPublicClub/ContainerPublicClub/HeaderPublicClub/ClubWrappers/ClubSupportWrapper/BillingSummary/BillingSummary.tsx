import type { BillingSummaryFragment$key } from '@//:artifacts/BillingSummaryFragment.graphql'
import { graphql } from 'react-relay'
import { useFragment } from 'react-relay/hooks'
import { Box, Center, Heading, Stack, Text } from '@chakra-ui/react'
import LargeClubHeader from '../../../../../../../../../../../club/home/RootClubHome/ClubHome/LargeClubHeader/LargeClubHeader'
import { LargeBackgroundBox } from '@//:modules/content/PageLayout'
import displayPrice from '@//:modules/support/displayPrice'
import { useLingui } from '@lingui/react'
import { dateFnsLocaleFromI18n } from '@//:modules/locale'
import { Trans } from '@lingui/macro'
import { useSequenceContext } from '@//:modules/content/HookedComponents/Sequence'

interface Props {
  query: BillingSummaryFragment$key
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
  query
}: Props): JSX.Element {
  const data = useFragment(Fragment, query)

  const { i18n } = useLingui()
  const locale = dateFnsLocaleFromI18n(i18n)

  const getPriceByCurrency = (currency): PriceProps => {
    return data.supporterSubscriptionPrice.prices.filter((item) => (
      item.currency === currency
    ))[0]
  }

  const {
    state
  } = useSequenceContext()

  const currentPrice = getPriceByCurrency(state.currency)

  const price = displayPrice({
    amount: currentPrice.amount,
    currency: currentPrice.currency,
    locale: locale
  })

  return (
    <Stack spacing={4}>
      <Box>
        <LargeClubHeader query={data} />
        <Heading fontSize='sm' color='gray.200'>
          <Trans>
            Your contribution directly supports this creator and unlocks access to their exclusive content
          </Trans>
        </Heading>
      </Box>
      <Stack spacing={1}>
        <LargeBackgroundBox bg='gray.800'>
          <Center>
            <Heading alignSelf='center' fontSize='2xl' color='gray.00'>
              {price} per month
            </Heading>
          </Center>
        </LargeBackgroundBox>
        <Text fontSize='sm' color='gray.200'>
          <Trans>
            Billed every 30 days, starting from the day you subscribe. You can cancel at any time from your
            Billing page, which is located in your Account Settings.
          </Trans>
        </Text>
        <Text fontSize='sm' color='gray.200'>
          <Trans>
            If requested, refunds may be considered on a case-by-case basis.
          </Trans>
        </Text>
      </Stack>
    </Stack>
  )
}
