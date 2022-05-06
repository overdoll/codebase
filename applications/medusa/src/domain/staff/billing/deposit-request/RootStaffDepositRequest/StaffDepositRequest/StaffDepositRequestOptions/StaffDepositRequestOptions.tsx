import { graphql, useFragment } from 'react-relay/hooks'
import type { StaffDepositRequestOptionsFragment$key } from '@//:artifacts/StaffDepositRequestOptionsFragment.graphql'
import { useLingui } from '@lingui/react'
import { dateFnsLocaleFromI18n } from '@//:modules/locale'
import { Box, Stack } from '@chakra-ui/react'
import { PageSectionTitle, PageSectionWrap, SmallBackgroundBox } from '@//:modules/content/PageLayout'
import { Trans } from '@lingui/macro'
import displayPrice from '@//:modules/support/displayPrice'
import format from 'date-fns/format'
import { dateFormatWithTime } from '@//:modules/constants/format'

interface Props {
  query: StaffDepositRequestOptionsFragment$key
}

const Fragment = graphql`
  fragment StaffDepositRequestOptionsFragment on DepositRequest {
    baseAmount
    currency
    estimatedFeeAmount
    payoutMethod
    lastDateForDeposit
    createdAt
    totalAmount
  }
`

export default function StaffDepositRequestOptions ({ query }: Props): JSX.Element {
  const data = useFragment(Fragment, query)

  const { i18n } = useLingui()
  const locale = dateFnsLocaleFromI18n(i18n)
  const lastDateForDeposit = format(new Date(data.lastDateForDeposit as Date), dateFormatWithTime, { locale })
  const createdAt = format(new Date(data.createdAt as Date), dateFormatWithTime, { locale })
  const totalAmount = displayPrice({
    amount: data.totalAmount,
    currency: data.currency,
    locale: locale
  })
  const baseAmount = displayPrice({
    amount: data.baseAmount,
    currency: data.currency,
    locale: locale
  })
  const estimatedFeeAmount = displayPrice({
    amount: data.estimatedFeeAmount,
    currency: data.currency,
    locale: locale
  })

  return (
    <Stack spacing={8}>
      <Box>
        <PageSectionWrap>
          <PageSectionTitle>
            <Trans>
              Total Amount
            </Trans>
          </PageSectionTitle>
        </PageSectionWrap>
        <SmallBackgroundBox>
          <Trans>
            {totalAmount}
          </Trans>
        </SmallBackgroundBox>
      </Box>
      <Box>
        <PageSectionWrap>
          <PageSectionTitle>
            <Trans>
              Payout Method
            </Trans>
          </PageSectionTitle>
        </PageSectionWrap>
        <SmallBackgroundBox>
          {data.payoutMethod}
        </SmallBackgroundBox>
      </Box>
      <Box>
        <PageSectionWrap>
          <PageSectionTitle>
            <Trans>
              Last Date for Deposit
            </Trans>
          </PageSectionTitle>
        </PageSectionWrap>
        <SmallBackgroundBox>
          {lastDateForDeposit}
        </SmallBackgroundBox>
      </Box>
      <Box>
        <PageSectionWrap>
          <PageSectionTitle>
            <Trans>
              Base Amount
            </Trans>
          </PageSectionTitle>
        </PageSectionWrap>
        <SmallBackgroundBox>
          {baseAmount}
        </SmallBackgroundBox>
      </Box>
      <Box>
        <PageSectionWrap>
          <PageSectionTitle>
            <Trans>
              Estimated Fee Amount
            </Trans>
          </PageSectionTitle>
        </PageSectionWrap>
        <SmallBackgroundBox>
          {estimatedFeeAmount}
        </SmallBackgroundBox>
      </Box>
      <Box>
        <PageSectionWrap>
          <PageSectionTitle>
            <Trans>
              Created At
            </Trans>
          </PageSectionTitle>
        </PageSectionWrap>
        <SmallBackgroundBox>
          {createdAt}
        </SmallBackgroundBox>
      </Box>
    </Stack>
  )
}
