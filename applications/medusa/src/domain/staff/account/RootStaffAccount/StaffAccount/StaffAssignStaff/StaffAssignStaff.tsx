import { graphql, useFragment } from 'react-relay/hooks'
import { StaffAssignStaffFragment$key } from '@//:artifacts/StaffAssignStaffFragment.graphql'
import { Stack } from '@chakra-ui/react'
import { PageSectionTitle, PageSectionWrap } from '@//:modules/content/PageLayout'
import { Trans } from '@lingui/macro'
import BooleanHeader from '../../../../../../common/components/BooleanHeader/BooleanHeader'
import { Collapse, CollapseBody, CollapseButton } from '@//:modules/content/ThemeComponents/Collapse/Collapse'
import StaffAssignStaffButton from './StaffAssignStaffButton/StaffAssignStaffButton'
import StaffRevokeStaffButton from './StaffRevokeStaffButton/StaffRevokeStaffButton'

interface Props {
  query: StaffAssignStaffFragment$key
}

const Fragment = graphql`
  fragment StaffAssignStaffFragment on Account {
    isStaff
    ...StaffAssignStaffButtonFragment
    ...StaffRevokeStaffButtonFragment
  }
`

export default function StaffAssignStaff ({ query }: Props): JSX.Element {
  const data = useFragment(Fragment, query)

  return (
    <>
      <PageSectionWrap>
        <PageSectionTitle>
          <Trans>
            Staff
          </Trans>
        </PageSectionTitle>
      </PageSectionWrap>
      <Stack spacing={2}>
        <BooleanHeader isEnabled={data.isStaff} />
        <Collapse>
          <CollapseButton>
            {data.isStaff
              ? (
                <Trans>
                  Revoke Staff
                </Trans>)
              : (
                <Trans>
                  Assign Staff
                </Trans>)}
          </CollapseButton>
          <CollapseBody>
            {data.isStaff
              ? <StaffRevokeStaffButton query={data} />
              : <StaffAssignStaffButton query={data} />}
          </CollapseBody>
        </Collapse>
      </Stack>
    </>
  )
}
