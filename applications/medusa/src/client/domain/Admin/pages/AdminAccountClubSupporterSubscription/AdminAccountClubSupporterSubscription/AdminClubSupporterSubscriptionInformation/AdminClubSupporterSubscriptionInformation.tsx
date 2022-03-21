import { graphql, useFragment } from 'react-relay/hooks'
import type {
  AdminClubSupporterSubscriptionInformationFragment$key
} from '@//:artifacts/AdminClubSupporterSubscriptionInformationFragment.graphql'
import { useLingui } from '@lingui/react'
import { dateFnsLocaleFromI18n } from '@//:modules/locale'
import { Box, Stack } from '@chakra-ui/react'
import { PageSectionTitle, PageSectionWrap, SmallBackgroundBox } from '@//:modules/content/PageLayout'
import { Trans } from '@lingui/macro'
import displayPrice from '@//:modules/support/displayPrice'
import formatDistanceToNow from 'date-fns/formatDistanceToNow'

interface Props {
  query: AdminClubSupporterSubscriptionInformationFragment$key
}

const Fragment = graphql`
  fragment AdminClubSupporterSubscriptionInformationFragment on IAccountClubSupporterSubscription {
    billingAmount
    billingCurrency
    updatedAt
  }
`

export default function AdminClubSupporterSubscriptionInformation ({ query }: Props): JSX.Element {
  const data = useFragment(Fragment, query)

  const { i18n } = useLingui()
  const locale = dateFnsLocaleFromI18n(i18n)
  const updatedAt = formatDistanceToNow(new Date(data.updatedAt as Date), {
    locale: locale,
    includeSeconds: true,
    addSuffix: true
  })
  const price = displayPrice({
    amount: data.billingAmount,
    currency: data.billingCurrency,
    locale: locale
  })

  return (
    <Stack spacing={8}>
      <Box>
        <PageSectionWrap>
          <PageSectionTitle>
            <Trans>
              Pricing
            </Trans>
          </PageSectionTitle>
        </PageSectionWrap>
        <SmallBackgroundBox>
          <Trans>
            {price}/mo
          </Trans>
        </SmallBackgroundBox>
      </Box>
      <Box>
        <PageSectionWrap>
          <PageSectionTitle>
            <Trans>
              Last Update
            </Trans>
          </PageSectionTitle>
        </PageSectionWrap>
        <SmallBackgroundBox>
          {updatedAt}
        </SmallBackgroundBox>
      </Box>
    </Stack>
  )
}
