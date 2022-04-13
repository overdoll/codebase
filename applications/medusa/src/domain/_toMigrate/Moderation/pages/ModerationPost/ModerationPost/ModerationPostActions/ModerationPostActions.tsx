import { graphql, useFragment } from 'react-relay'
import type { ModerationPostActionsFragment$key } from '@//:artifacts/ModerationPostActionsFragment.graphql'
import { PageSectionTitle, PageSectionWrap } from '@//:modules/content/PageLayout'
import { Trans } from '@lingui/macro'
import { Box, Stack } from '@chakra-ui/react'
import { Collapse, CollapseBody, CollapseButton } from '@//:modules/content/ThemeComponents/Collapse/Collapse'
import ModerationRemovePostForm from './ModerationRemovePostForm/ModerationRemovePostForm'

interface Props {
  query: ModerationPostActionsFragment$key
}

const Fragment = graphql`
  fragment ModerationPostActionsFragment on Post {
    ...ModerationRemovePostFormFragment
  }
`

export default function ModerationPostActions ({ query }: Props): JSX.Element {
  const data = useFragment(Fragment, query)

  return (
    <Stack spacing={2}>
      <Box>
        <PageSectionWrap>
          <PageSectionTitle>
            <Trans>
              Remove
            </Trans>
          </PageSectionTitle>
        </PageSectionWrap>
        <Collapse>
          <CollapseButton size='lg' colorScheme='gray'>
            <Trans>
              Remove Post
            </Trans>
          </CollapseButton>
          <CollapseBody>
            <ModerationRemovePostForm query={data} />
          </CollapseBody>
        </Collapse>
      </Box>
    </Stack>
  )
}
