import { graphql, useFragment } from 'react-relay/hooks'
import { StaffClubPostsFragment$key } from '@//:artifacts/StaffClubPostsFragment.graphql'
import { Stack } from '@chakra-ui/react'
import { Trans } from '@lingui/macro'
import { Collapse, CollapseBody, CollapseButton } from '@//:modules/content/ThemeComponents/Collapse/Collapse'
import StaffDisableClubSupporterOnlyPostsButton
  from './StaffDisableClubSupporterOnlyPostsButton/StaffDisableClubSupporterOnlyPostsButton'
import StaffEnableClubSupporterOnlyPostsButton
  from './StaffEnableClubSupporterOnlyPostsButton/StaffEnableClubSupporterOnlyPostsButton'

interface Props {
  query: StaffClubPostsFragment$key
}

const Fragment = graphql`
  fragment StaffClubPostsFragment on Club {
    canCreateSupporterOnlyPosts
    ...StaffDisableClubSupporterOnlyPostsButtonFragment
    ...StaffEnableClubSupporterOnlyPostsButtonFragment
  }
`

export default function StaffClubPosts ({ query }: Props): JSX.Element {
  const data = useFragment(Fragment, query)

  return (
    <Stack spacing={2}>
      {data.canCreateSupporterOnlyPosts
        ? (
          <Collapse>
            <CollapseButton>
              <Trans>
                Prevent Creation of Supporter Posts
              </Trans>
            </CollapseButton>
            <CollapseBody>
              <StaffDisableClubSupporterOnlyPostsButton query={data} />
            </CollapseBody>
          </Collapse>)
        : (
          <Collapse>
            <CollapseButton>
              <Trans>
                Add Ability to Create Supporter Posts
              </Trans>
            </CollapseButton>
            <CollapseBody>
              <StaffEnableClubSupporterOnlyPostsButton query={data} />
            </CollapseBody>
          </Collapse>)}
    </Stack>
  )
}
