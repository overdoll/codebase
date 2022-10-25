import type { BillingSummaryFragment$key } from '@//:artifacts/BillingSummaryFragment.graphql'
import { graphql } from 'react-relay'
import { useFragment } from 'react-relay/hooks'
import { Box, Center, Flex, Heading, Stack, Text } from '@chakra-ui/react'
import { LargeBackgroundBox } from '@//:modules/content/PageLayout'
import displayPrice from '@//:modules/support/displayPrice'
import { useLingui } from '@lingui/react'
import { dateFnsLocaleFromI18n } from '@//:modules/locale'
import { Trans } from '@lingui/macro'
import { useSequenceContext } from '@//:modules/content/HookedComponents/Sequence'
import ChooseCurrency from './ChooseCurrency/ChooseCurrency'

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
    ...ChooseCurrencyFragment
  }
`

export default function BillingSummary (props: Props): JSX.Element {
  const {
    query
  } = props

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
    <Stack spacing={1}>
      <Box position='relative'>
        <LargeBackgroundBox bg='gray.800'>
          <Flex justify='space-between'>
            <Center w='100%'>
              <Heading alignSelf='center' fontSize='2xl' color='gray.00'>
                {price} per month
              </Heading>
            </Center>
            <ChooseCurrency query={data} />
          </Flex>
        </LargeBackgroundBox>
        <Box bottom={0} right={0} position='absolute' />
      </Box>
      <Text fontSize='xs' color='gray.200'>
        <Trans>
          Billed every 30 days, starting from the day you subscribe. You can cancel at any time from your
          Billing page, which is located in your Account Settings.
        </Trans>
      </Text>
      <Text fontSize='xs' color='gray.200'>
        <Trans>
          If requested, refunds may be considered on a case-by-case basis.
        </Trans>
      </Text>
    </Stack>
  )
}
