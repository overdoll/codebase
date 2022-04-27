import { graphql, useFragment } from 'react-relay/hooks'
import { StaffClubPayoutsFragment$key } from '@//:artifacts/StaffClubPayoutsFragment.graphql'
import { Box, Stack } from '@chakra-ui/react'
import ClubBalance
  from '../../../../../club/revenue/root/RootClubRevenue/ClubRevenue/ClubFullBalance/ClubBalance/ClubBalance'
import { PayoutMethod } from '@//:assets/icons'
import { Trans } from '@lingui/macro'
import StatisticHeader from '../../../../../../common/components/StatisticHeader/StatisticHeader'
import { Collapse, CollapseBody, CollapseButton } from '@//:modules/content/ThemeComponents/Collapse/Collapse'
import UpdateClubPlatformFeeForm from './UpdateClubPlatformFeeForm/UpdateClubPlatformFeeForm'
import InitiateClubPayoutForm from './InitiateClubPayoutForm/InitiateClubPayoutForm'
import StaffClubPayoutsList from './StaffClubPayoutsList/StaffClubPayoutsList'
import { PageSectionTitle, PageSectionWrap } from '@//:modules/content/PageLayout'

interface Props {
  query: StaffClubPayoutsFragment$key
}

const Fragment = graphql`
  fragment StaffClubPayoutsFragment on Club {
    platformFee {
      percent
    }
    ...ClubBalanceFragment
    ...UpdateClubPlatformFeeFormFragment
    ...InitiateClubPayoutFormFragment
    ...StaffClubPayoutsListFragment
  }
`

export default function StaffClubPayouts ({ query }: Props): JSX.Element {
  const data = useFragment(Fragment, query)

  return (
    <Stack spacing={8}>
      <Stack spacing={2}>
        <ClubBalance query={data} />
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
