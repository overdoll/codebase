import { graphql, useFragment } from 'react-relay/hooks'
import type {
  AdminClubSupporterSubscriptionBillingErrorFragment$key
} from '@//:artifacts/AdminClubSupporterSubscriptionBillingErrorFragment.graphql'
import { useLingui } from '@lingui/react'
import { dateFnsLocaleFromI18n } from '@//:modules/locale'
import format from 'date-fns/format'
import { dateFormat } from '@//:modules/constants/format'
import { Box, Stack } from '@chakra-ui/react'
import { PageSectionTitle, PageSectionWrap, SmallBackgroundBox } from '@//:modules/content/PageLayout'
import { Trans } from '@lingui/macro'
import formatDistanceToNow from 'date-fns/formatDistanceToNow'

interface Props {
  query: AdminClubSupporterSubscriptionBillingErrorFragment$key
}

const Fragment = graphql`
  fragment AdminClubSupporterSubscriptionBillingErrorFragment on IAccountClubSupporterSubscription {
    billingError {
      ccbillDeclineError
      ccbillErrorCode
      ccbillErrorText
      failedAt
      nextRetryDate
    }
  }
`

export default function AdminClubSupporterSubscriptionBillingError ({ query }: Props): JSX.Element {
  const data = useFragment(Fragment, query)

  const { i18n } = useLingui()
  const locale = dateFnsLocaleFromI18n(i18n)

  if (data.billingError == null) {
    return (
      <SmallBackgroundBox>
        <Trans>
          No billing error found
        </Trans>
      </SmallBackgroundBox>
    )
  }

  const failedAt = format(new Date(data.billingError.failedAt as Date), dateFormat, { locale })
  const nextRetryDate = formatDistanceToNow(new Date(data.billingError.nextRetryDate as Date), {
    locale: locale,
    includeSeconds: true
  })

  return (
    <Stack spacing={8}>
      <Box>
        <PageSectionWrap>
          <PageSectionTitle>
            <Trans>
              CCBill Decline Error
            </Trans>
          </PageSectionTitle>
        </PageSectionWrap>
        <SmallBackgroundBox>
          {data.billingError.ccbillDeclineError}
        </SmallBackgroundBox>
      </Box>
      <Box>
        <PageSectionWrap>
          <PageSectionTitle>
            <Trans>
              CCBill Error Code
            </Trans>
          </PageSectionTitle>
        </PageSectionWrap>
        <SmallBackgroundBox>
          {data.billingError.ccbillErrorCode}
        </SmallBackgroundBox>
      </Box>
      <Box>
        <PageSectionWrap>
          <PageSectionTitle>
            <Trans>
              CCBill Error Text
            </Trans>
          </PageSectionTitle>
        </PageSectionWrap>
        <SmallBackgroundBox>
          {data.billingError.ccbillErrorText}
        </SmallBackgroundBox>
      </Box>
      <Box>
        <PageSectionWrap>
          <PageSectionTitle>
            <Trans>
              Failed At
            </Trans>
          </PageSectionTitle>
        </PageSectionWrap>
        <SmallBackgroundBox>
          {failedAt}
        </SmallBackgroundBox>
      </Box>
      <Box>
        <PageSectionWrap>
          <PageSectionTitle>
            <Trans>
              Next Retry
            </Trans>
          </PageSectionTitle>
        </PageSectionWrap>
        <SmallBackgroundBox>
          {nextRetryDate}
        </SmallBackgroundBox>
      </Box>
    </Stack>
  )
}
