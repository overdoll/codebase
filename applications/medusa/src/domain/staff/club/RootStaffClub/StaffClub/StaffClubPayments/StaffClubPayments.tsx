import { graphql, useFragment } from 'react-relay/hooks'
import { StaffClubPaymentsFragment$key } from '@//:artifacts/StaffClubPaymentsFragment.graphql'
import StatisticHeader from '../../../../../../common/components/StatisticHeader/StatisticHeader'
import { PayoutMethod } from '@//:assets/icons'
import { Trans } from '@lingui/macro'
import { Collapse, CollapseBody, CollapseButton } from '@//:modules/content/ThemeComponents/Collapse/Collapse'
import UpdateClubPlatformFeeForm from '../StaffClubPayouts/UpdateClubPlatformFeeForm/UpdateClubPlatformFeeForm'
import { Stack } from '@chakra-ui/react'

interface Props {
  query: StaffClubPaymentsFragment$key
}

const Fragment = graphql`
  fragment StaffClubPaymentsFragment on Club {
    platformFee {
      percent
    }
    ...UpdateClubPlatformFeeFormFragment
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
    </Stack>
  )
}
