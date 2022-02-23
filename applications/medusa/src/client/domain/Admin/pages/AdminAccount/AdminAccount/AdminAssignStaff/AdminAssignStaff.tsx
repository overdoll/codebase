import { graphql, useFragment } from 'react-relay/hooks'
import { AdminAssignStaffFragment$key } from '@//:artifacts/AdminAssignStaffFragment.graphql'
import { Stack } from '@chakra-ui/react'
import { PageSectionTitle, PageSectionWrap } from '@//:modules/content/PageLayout'
import { Trans } from '@lingui/macro'
import BooleanHeader from '../../../../components/BooleanHeader/BooleanHeader'
import { Collapse, CollapseBody, CollapseButton } from '@//:modules/content/ThemeComponents/Collapse/Collapse'
import AdminAssignStaffButton from './AdminAssignStaffButton/AdminAssignStaffButton'
import AdminRevokeStaffButton from './AdminRevokeStaffButton/AdminRevokeStaffButton'

interface Props {
  query: AdminAssignStaffFragment$key
}

const Fragment = graphql`
  fragment AdminAssignStaffFragment on Account {
    isStaff
    ...AdminAssignStaffButtonFragment
    ...AdminRevokeStaffButtonFragment
  }
`

export default function AdminAssignStaff ({ query }: Props): JSX.Element {
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
              ? <AdminRevokeStaffButton query={data} />
              : <AdminAssignStaffButton query={data} />}
          </CollapseBody>
        </Collapse>
      </Stack>
    </>
  )
}
