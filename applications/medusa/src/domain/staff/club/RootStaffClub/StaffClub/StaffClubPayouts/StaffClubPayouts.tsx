import { graphql, useFragment } from 'react-relay/hooks'
import { StaffClubPayoutsFragment$key } from '@//:artifacts/StaffClubPayoutsFragment.graphql'
import { Box, Stack } from '@chakra-ui/react'
import ClubBalance
  from '../../../../../club/revenue/root/RootClubRevenue/ClubRevenue/ClubFullBalance/ClubBalance/ClubBalance'
import { Trans } from '@lingui/macro'
import { Collapse, CollapseBody, CollapseButton } from '@//:modules/content/ThemeComponents/Collapse/Collapse'
import InitiateClubPayoutForm from './InitiateClubPayoutForm/InitiateClubPayoutForm'
import StaffClubPayoutsList from './StaffClubPayoutsList/StaffClubPayoutsList'
import { PageSectionTitle, PageSectionWrap, SmallBackgroundBox } from '@//:modules/content/PageLayout'
import displayPrice from '@//:modules/support/displayPrice'
import { useLingui } from '@lingui/react'
import { dateFnsLocaleFromI18n } from '@//:modules/locale'

interface Props {
  query: StaffClubPayoutsFragment$key
}

const Fragment = graphql`
  fragment StaffClubPayoutsFragment on Club {
    pendingBalance {
      currency
      amount
    }
    ...ClubBalanceFragment
    ...UpdateClubPlatformFeeFormFragment
    ...InitiateClubPayoutFormFragment
    ...StaffClubPayoutsListFragment
  }
`

export default function StaffClubPayouts ({ query }: Props): JSX.Element {
  const data = useFragment(Fragment, query)

  const { i18n } = useLingui()
  const locale = dateFnsLocaleFromI18n(i18n)

  const pendingBalance = displayPrice({
    amount: data.pendingBalance.amount,
    currency: data.pendingBalance.currency,
    locale: locale
  })

  return (
    <Stack spacing={8}>
      <Stack spacing={2}>
        <ClubBalance query={data} />
        <SmallBackgroundBox>
          <Trans>
            Pending {pendingBalance}
          </Trans>
        </SmallBackgroundBox>
        <Collapse>
          <CollapseButton>
            <Trans>
              Initiate Payout
            </Trans>
          </CollapseButton>
          <CollapseBody>
            <InitiateClubPayoutForm query={data} />
          </CollapseBody>
        </Collapse>
      </Stack>
      <Box>
        <PageSectionWrap>
          <PageSectionTitle>
            <Trans>Payouts</Trans>
          </PageSectionTitle>
        </PageSectionWrap>
        <StaffClubPayoutsList query={data} />
      </Box>
    </Stack>
  )
}
