import { graphql, useFragment } from 'react-relay'
import type { ModerationPostActionsFragment$key } from '@//:artifacts/ModerationPostActionsFragment.graphql'
import { PageSectionTitle, PageSectionWrap } from '@//:modules/content/PageLayout'
import { Trans } from '@lingui/macro'
import { Box, Stack } from '@chakra-ui/react'
import { Collapse, CollapseBody, CollapseButton } from '@//:modules/content/ThemeComponents/Collapse/Collapse'
import ModerationRemovePostForm from './ModerationRemovePostForm/ModerationRemovePostForm'
import LinkButton from '@//:modules/content/ThemeComponents/LinkButton/LinkButton'

interface Props {
  query: ModerationPostActionsFragment$key
}

const Fragment = graphql`
  fragment ModerationPostActionsFragment on Post {
    reference
    club {
      slug
    }
    ...ModerationRemovePostFormFragment
  }
`

export default function ModerationPostActions ({ query }: Props): JSX.Element {
  const data = useFragment(Fragment, query)

  return (
    <Stack spacing={8}>
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
      <Box>
        <PageSectionWrap>
          <PageSectionTitle>
            <Trans>
              Edit
            </Trans>
          </PageSectionTitle>
        </PageSectionWrap>
        <LinkButton
          w='100%'
          size='lg'
          href={{
            pathname: '/club/[slug]/create-post',
            query: {
              slug: data.club.slug,
              post: data.reference
            }
          }}
        >
          <Trans>
            Edit Post
          </Trans>
        </LinkButton>
      </Box>
    </Stack>
  )
}
