import { graphql, useFragment } from 'react-relay/hooks'
import { StaffAssignModeratorFragment$key } from '@//:artifacts/StaffAssignModeratorFragment.graphql'
import { Stack } from '@chakra-ui/react'
import { PageSectionTitle, PageSectionWrap } from '@//:modules/content/PageLayout'
import { Trans } from '@lingui/macro'
import BooleanHeader from '../../../../../../common/components/BooleanHeader/BooleanHeader'
import { Collapse, CollapseBody, CollapseButton } from '@//:modules/content/ThemeComponents/Collapse/Collapse'
import StaffAssignModeratorButton from './StaffAssignModeratorButton/StaffAssignModeratorButton'
import StaffRevokeModeratorButton from './StaffRevokeModeratorButton/StaffRevokeModeratorButton'

interface Props {
  query: StaffAssignModeratorFragment$key
}

const Fragment = graphql`
  fragment StaffAssignModeratorFragment on Account {
    isModerator
    ...StaffAssignModeratorButtonFragment
    ...StaffRevokeModeratorButtonFragment
  }
`

export default function StaffAssignModerator ({ query }: Props): JSX.Element {
  const data = useFragment(Fragment, query)

  return (
    <>
      <PageSectionWrap>
        <PageSectionTitle>
          <Trans>
            Moderator
          </Trans>
        </PageSectionTitle>
      </PageSectionWrap>
      <Stack spacing={2}>
        <BooleanHeader isEnabled={data.isModerator} />
        <Collapse>
          <CollapseButton>
            {data.isModerator
              ? (
                <Trans>
                  Revoke Moderator
                </Trans>)
              : (
                <Trans>
                  Assign Moderator
                </Trans>)}
          </CollapseButton>
          <CollapseBody>
            {data.isModerator
              ? <StaffRevokeModeratorButton query={data} />
              : <StaffAssignModeratorButton query={data} />}
          </CollapseBody>
        </Collapse>
      </Stack>
    </>
  )
}
