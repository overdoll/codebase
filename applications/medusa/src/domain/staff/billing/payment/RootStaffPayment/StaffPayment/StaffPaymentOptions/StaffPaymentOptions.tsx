import { graphql, useFragment } from 'react-relay/hooks'
import type { StaffPaymentOptionsFragment$key } from '@//:artifacts/StaffPaymentOptionsFragment.graphql'
import { useLingui } from '@lingui/react'
import { dateFnsLocaleFromI18n } from '@//:modules/locale'
import { Badge, Box, Stack } from '@chakra-ui/react'
import { PageSectionTitle, PageSectionWrap, SmallBackgroundBox } from '@//:modules/content/PageLayout'
import { Trans } from '@lingui/macro'
import displayPrice from '@//:modules/support/displayPrice'
import {
  STATUS_COLORS
} from '../../../../../club/RootStaffClub/StaffClub/StaffClubPayments/StaffClubPaymentsList/StaffClubPaymentCard/StaffClubPaymentCard'
import BooleanHeader from '../../../../../../../common/components/BooleanHeader/BooleanHeader'

interface Props {
  query: StaffPaymentOptionsFragment$key
}

const Fragment = graphql`
  fragment StaffPaymentOptionsFragment on ClubPayment {
    baseAmount
    platformFeeAmount
    finalAmount
    currency
    status
    isDeduction
  }
`

export default function StaffPaymentOptions ({ query }: Props): JSX.Element {
  const data = useFragment(Fragment, query)

  const { i18n } = useLingui()
  const locale = dateFnsLocaleFromI18n(i18n)
  const baseAmount = displayPrice({
    amount: data.baseAmount,
    currency: data.currency,
    locale: locale
  })
  const finalAmount = displayPrice({
    amount: data.finalAmount,
    currency: data.currency,
    locale: locale
  })
  const platformFeeAmount = displayPrice({
    amount: data.platformFeeAmount,
    currency: data.currency,
    locale: locale
  })

  return (
    <Stack spacing={8}>
      <Box>
        <PageSectionWrap>
          <PageSectionTitle>
            <Trans>
              Status
            </Trans>
          </PageSectionTitle>
        </PageSectionWrap>
        <SmallBackgroundBox>
          <Badge borderRadius='base' fontSize='sm' colorScheme={STATUS_COLORS[data.status]}>
            {data.status}
          </Badge>
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
              Platform Fee
            </Trans>
          </PageSectionTitle>
        </PageSectionWrap>
        <SmallBackgroundBox>
          {platformFeeAmount}
        </SmallBackgroundBox>
      </Box>
      <Box>
        <PageSectionWrap>
          <PageSectionTitle>
            <Trans>
              Final Amount
            </Trans>
          </PageSectionTitle>
        </PageSectionWrap>
        <SmallBackgroundBox>
          {finalAmount}
        </SmallBackgroundBox>
      </Box>
      <Box>
        <PageSectionWrap>
          <PageSectionTitle>
            <Trans>
              Is Deduction
            </Trans>
          </PageSectionTitle>
        </PageSectionWrap>
        <BooleanHeader isEnabled={data.isDeduction} />
      </Box>
    </Stack>
  )
}
