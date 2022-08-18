import { graphql, useFragment } from 'react-relay/hooks'
import { StaffClubPaymentsFragment$key } from '@//:artifacts/StaffClubPaymentsFragment.graphql'
import StatisticHeader from '../../../../../../common/components/StatisticHeader/StatisticHeader'
import { PayoutMethod } from '@//:assets/icons'
import { Trans } from '@lingui/macro'
import { Collapse, CollapseBody, CollapseButton } from '@//:modules/content/ThemeComponents/Collapse/Collapse'
import UpdateClubPlatformFeeForm from '../StaffClubPayouts/UpdateClubPlatformFeeForm/UpdateClubPlatformFeeForm'
import { Box, Stack } from '@chakra-ui/react'
import { PageSectionTitle, PageSectionWrap } from '@//:modules/content/PageLayout'
import StaffClubPaymentsList from './StaffClubPaymentsList/StaffClubPaymentsList'
import ClubTransactionMetrics
  from '../../../../../../common/components/ClubTransactionMetrics/ClubTransactionMetrics'

interface Props {
  query: StaffClubPaymentsFragment$key
}

const Fragment = graphql`
  fragment StaffClubPaymentsFragment on Club {
    platformFee {
      percent
    }
    ...UpdateClubPlatformFeeFormFragment
    ...StaffClubPaymentsListFragment
    ...ClubTransactionMetricsFragment
  }
`

export default function StaffClubPayments ({ query }: Props): JSX.Element {
  const data = useFragment(Fragment, query)

  return (
    <Stack spacing={8}>
      <Stack spacing={2}>
        <StatisticHeader
          icon={PayoutMethod}
          title={(
            <Trans>
              Platform Fee
            </Trans>)}
        >
          {data.platformFee.percent}%
        </StatisticHeader>
        <Collapse>
          <CollapseButton>
            <Trans>
              Update Platform Fee
            </Trans>
          </CollapseButton>
          <CollapseBody>
            <UpdateClubPlatformFeeForm query={data} />
          </CollapseBody>
        </Collapse>
      </Stack>
      <ClubTransactionMetrics query={data} />
      <Box>
        <PageSectionWrap>
          <PageSectionTitle>
            <Trans>Payments</Trans>
          </PageSectionTitle>
        </PageSectionWrap>
        <StaffClubPaymentsList query={data} />
      </Box>
    </Stack>
  )
}
