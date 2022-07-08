import { graphql, useFragment } from 'react-relay/hooks'
import { ClubTransactionMetricFragment$key } from '@//:artifacts/ClubTransactionMetricFragment.graphql'
import { Heading, HStack, Stack } from '@chakra-ui/react'
import { LargeBackgroundBox } from '@//:modules/content/PageLayout'
import GraphTransactionMetric from './GraphTransactionMetric/GraphTransactionMetric'
import { useLingui } from '@lingui/react'
import { dateFnsLocaleFromI18n } from '@//:modules/locale'
import displayPrice from '@//:modules/support/displayPrice'
import format from 'date-fns/format'
import { Trans } from '@lingui/macro'

interface Props {
  query: ClubTransactionMetricFragment$key
}

const Fragment = graphql`
  fragment ClubTransactionMetricFragment on ClubTransactionMetric {
    month
    year
    currency
    chargebacksAmountRatio
    chargebacksAmount
    chargebacksCount
    refundsAmountRatio
    refundsAmount
    refundsCount
    totalTransactionsAmount
  }
`

const REFUNDS_TARGET_RATIO = 0.05
const CHARGEBACKS_TARGET_RATIO = 0.005

export default function ClubTransactionMetric ({ query }: Props): JSX.Element {
  const data = useFragment(
    Fragment, query
  )

  const { i18n } = useLingui()
  const locale = dateFnsLocaleFromI18n(i18n)

  const totalTransactionsAmount = displayPrice({
    amount: data.totalTransactionsAmount,
    currency: data.currency,
    locale: locale
  })

  const refundsAmount = displayPrice({
    amount: data.refundsAmount,
    currency: data.currency,
    locale: locale
  })

  const chargebacksAmount = displayPrice({
    amount: data.chargebacksAmount,
    currency: data.currency,
    locale: locale
  })

  const date = format(new Date(data.year, data.month, 0), 'LLLL Y', { locale })

  return (
    <LargeBackgroundBox>
      <Stack spacing={2}>
        <HStack align='center' justify='space-between'>
          <Heading fontSize='lg' color='gray.200'>
            {date}
          </Heading>
          <Heading fontSize='sm' color='gray.200'>
            <Trans>
              {totalTransactionsAmount} total processed
            </Trans>
          </Heading>
        </HStack>
        <Stack spacing={1}>
          <Heading fontSize='sm' color='purple.300'>
            <Trans>
              Refunds (target is {'<'}{REFUNDS_TARGET_RATIO * 100}%)
            </Trans>
          </Heading>
          <GraphTransactionMetric
            currentAmount={refundsAmount}
            totalAmount={totalTransactionsAmount}
            colorScheme='purple'
            currentRatio={data.refundsAmountRatio}
            targetRatio={REFUNDS_TARGET_RATIO}
          />
        </Stack>
        <Stack spacing={1}>
          <Heading fontSize='sm' color='orange.300'>
            <Trans>
              Chargebacks (suspension at {'>'}{CHARGEBACKS_TARGET_RATIO * 100}%)
            </Trans>
          </Heading>
          <GraphTransactionMetric
            currentAmount={chargebacksAmount}
            totalAmount={totalTransactionsAmount}
            colorScheme='orange'
            currentRatio={data.chargebacksAmountRatio}
            targetRatio={CHARGEBACKS_TARGET_RATIO}
          />
        </Stack>
      </Stack>
    </LargeBackgroundBox>
  )
}
