import { graphql, useFragment } from 'react-relay/hooks'
import { StaffClubPostsFragment$key } from '@//:artifacts/StaffClubPostsFragment.graphql'
import { Stack } from '@chakra-ui/react'
import { Trans } from '@lingui/macro'
import { Collapse, CollapseBody, CollapseButton } from '@//:modules/content/ThemeComponents/Collapse/Collapse'
import StaffDisableClubSupporterOnlyPostsButton
  from './StaffDisableClubSupporterOnlyPostsButton/StaffDisableClubSupporterOnlyPostsButton'
import StaffEnableClubSupporterOnlyPostsButton
  from './StaffEnableClubSupporterOnlyPostsButton/StaffEnableClubSupporterOnlyPostsButton'
import StaffEnableClubCharactersButton from './StaffEnableClubCharactersButton/StaffEnableClubCharactersButton'
import { PageSectionTitle, PageSectionWrap } from '@//:modules/content/PageLayout'
import StaffDisableClubCharactersButton from './StaffDisableClubCharactersButton/StaffDisableClubCharactersButton'

interface Props {
  query: StaffClubPostsFragment$key
}

const Fragment = graphql`
  fragment StaffClubPostsFragment on Club {
    canCreateSupporterOnlyPosts
    charactersEnabled
    ...StaffDisableClubSupporterOnlyPostsButtonFragment
    ...StaffEnableClubSupporterOnlyPostsButtonFragment
    ...StaffEnableClubCharactersButtonFragment
    ...StaffDisableClubCharactersButtonFragment
  }
`

export default function StaffClubPosts ({ query }: Props): JSX.Element {
  const data = useFragment(Fragment, query)

  return (
    <Stack spacing={8}>
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
      <Stack spacing={2}>
        <PageSectionWrap>
          <PageSectionTitle colorScheme='teal'>
            <Trans>
              Club Characters
            </Trans>
          </PageSectionTitle>
        </PageSectionWrap>
        {data.charactersEnabled
          ? (
            <Stack spacing={2}>
              <StaffEnableClubCharactersButton query={data} />
              <StaffDisableClubCharactersButton query={data} />
            </Stack>
            )
          : (
            <StaffEnableClubCharactersButton query={data} />
            )}
      </Stack>
    </Stack>
  )
}
