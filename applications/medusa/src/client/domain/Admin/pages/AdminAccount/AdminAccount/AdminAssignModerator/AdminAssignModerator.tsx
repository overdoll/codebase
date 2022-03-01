import { graphql, useFragment } from 'react-relay/hooks'
import { AdminAssignModeratorFragment$key } from '@//:artifacts/AdminAssignModeratorFragment.graphql'
import { Stack } from '@chakra-ui/react'
import { PageSectionTitle, PageSectionWrap } from '@//:modules/content/PageLayout'
import { Trans } from '@lingui/macro'
import BooleanHeader from '../../../../components/BooleanHeader/BooleanHeader'
import { Collapse, CollapseBody, CollapseButton } from '@//:modules/content/ThemeComponents/Collapse/Collapse'
import AdminAssignModeratorButton from './AdminAssignModeratorButton/AdminAssignModeratorButton'
import AdminRevokeModeratorButton from './AdminRevokeModeratorButton/AdminRevokeModeratorButton'

interface Props {
  query: AdminAssignModeratorFragment$key
}

const Fragment = graphql`
  fragment AdminAssignModeratorFragment on Account {
    isModerator
    ...AdminAssignModeratorButtonFragment
    ...AdminRevokeModeratorButtonFragment
  }
`

export default function AdminAssignModerator ({ query }: Props): JSX.Element {
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
              ? <AdminRevokeModeratorButton query={data} />
              : <AdminAssignModeratorButton query={data} />}
          </CollapseBody>
        </Collapse>
      </Stack>
    </>
  )
}
