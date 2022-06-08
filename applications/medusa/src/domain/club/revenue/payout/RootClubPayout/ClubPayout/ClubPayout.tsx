import { graphql, PreloadedQuery, usePreloadedQuery } from 'react-relay/hooks'
import { ClubPayoutQuery } from '@//:artifacts/ClubPayoutQuery.graphql'
import { NotFoundGeneric } from '@//:modules/content/Placeholder'
import { Box, Heading, Stack } from '@chakra-ui/react'
import { t, Trans } from '@lingui/macro'
import displayPrice from '@//:modules/support/displayPrice'
import { useLingui } from '@lingui/react'
import { dateFnsLocaleFromI18n } from '@//:modules/locale'
import { PayoutMethod } from '@//:assets/icons'
import StatisticHeader from '../../../../../../common/components/StatisticHeader/StatisticHeader'
import {
  LargeBackgroundBox,
  PageSectionDescription,
  PageSectionTitle,
  PageSectionWrap
} from '@//:modules/content/PageLayout'
import format from 'date-fns/format'
import { dateFormatWithTime } from '@//:modules/constants/format'
import {
  STATUS_COLORS
} from '../../../../../staff/club/RootStaffClub/StaffClub/StaffClubPayouts/StaffClubPayoutsList/StaffClubPayoutCard/StaffClubPayoutCard'
import ClubPayoutPaymentsList from './ClubPayoutPaymentsList/ClubPayoutPaymentsList'

interface Props {
  query: PreloadedQuery<ClubPayoutQuery>
}

const Query = graphql`
  query ClubPayoutQuery($reference: String!)  {
    payout(reference: $reference) {
      amount
      coverFeeAmount
      currency
      status
      depositDate
      ...ClubPayoutPaymentsListFragment
    }
  }
`

export default function ClubPayout ({ query }: Props): JSX.Element {
  const queryData = usePreloadedQuery<ClubPayoutQuery>(
    Query,
    query
  )

  const { i18n } = useLingui()
  const locale = dateFnsLocaleFromI18n(i18n)

  const STATUS_DESCRIPTIONS = {
    CANCELLED: i18n._(t`The payout was cancelled. The next payout will occur on the standard payout schedule.`),
    DEPOSITED: i18n._(t`The payout was successfully deposited into your preferred payout method.`),
    FAILED: i18n._(t`The payout was not deposited. We will retry a few more times to deposit to your preferred payout method before cancelling the payout.`),
    PROCESSING: i18n._(t` The payout is processing and will be deposited shortly.`),
    QUEUED: i18n._(t`The payout is ready and will be processed on the standard payout schedule.`)
  }

  if (queryData?.payout == null) {
    return <NotFoundGeneric />
  }

  const amount = displayPrice({
    amount: queryData.payout.amount,
    currency: queryData.payout.currency,
    locale: locale
  })

  const coverFeeAmount = displayPrice({
    amount: queryData.payout.coverFeeAmount,
    currency: queryData.payout.currency,
    locale: locale
  })

  return (
    <Stack spacing={8}>
      <Stack spacing={2}>
        <StatisticHeader
          icon={PayoutMethod}
          title={(
            <Trans>
              Payout Amount
            </Trans>)}
        >
          {amount}
        </StatisticHeader>
        <LargeBackgroundBox>
          <Stack spacing={1}>
            <Heading fontSize='xl' color={`${STATUS_COLORS[queryData.payout.status] as string}.300`}>
              {queryData.payout.status}
            </Heading>
            <Heading fontSize='sm' color='gray.200'>
              {STATUS_DESCRIPTIONS[queryData.payout.status]}
            </Heading>
          </Stack>
        </LargeBackgroundBox>
        <LargeBackgroundBox>
          <Stack spacing={1}>
            <Heading color='gray.00' fontSize='xl'>
              {format(new Date(queryData.payout.depositDate as Date), dateFormatWithTime, { locale })}
            </Heading>
            <Heading color='gray.200' fontSize='sm'>
              <Trans>
                The payout will be attempted for deposit to your preferred payout method on this date
              </Trans>
            </Heading>
          </Stack>
        </LargeBackgroundBox>
        <LargeBackgroundBox>
          <Heading color='gray.200' fontSize='sm'>
            <Trans>
              A cover fee amount of {coverFeeAmount} will be added to the payout to cover any charges you may incur for
              receiving the payout
            </Trans>
          </Heading>
        </LargeBackgroundBox>
      </Stack>
      <Box>
        <PageSectionWrap>
          <PageSectionTitle>
            <Trans>
              Payments
            </Trans>
          </PageSectionTitle>
          <PageSectionDescription>
            <Trans>
              All of the payments that are associated with this payout.
            </Trans>
          </PageSectionDescription>
        </PageSectionWrap>
        <ClubPayoutPaymentsList query={queryData.payout} />
      </Box>
    </Stack>
  )
}
