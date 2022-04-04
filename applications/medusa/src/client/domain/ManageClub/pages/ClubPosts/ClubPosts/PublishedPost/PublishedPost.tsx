import { graphql, useFragment } from 'react-relay'
import type { PublishedPostFragment$key } from '@//:artifacts/PublishedPostFragment.graphql'
import { Badge, HStack, Stack } from '@chakra-ui/react'
import { GridTile, LinkTile } from '@//:modules/content/ContentSelection'
import PostPreviewContent
  from '../../../../../../../modules/content/Posts/components/PostData/PostPreviewContent/PostPreviewContent'
import { PostMenu } from '@//:modules/content/Posts'
import { Trans } from '@lingui/macro'
import PostCopyLinkButton
  from '@//:modules/content/Posts/components/PostInteraction/PostMenu/PostCopyLinkButton/PostCopyLinkButton'
import PostModerateButton
  from '@//:modules/content/Posts/components/PostInteraction/PostMenu/PostModerateButton/PostModerateButton'
import PostArchiveButton
  from '@//:modules/content/Posts/components/PostInteraction/PostMenu/PostArchiveButton/PostArchiveButton'

interface Props {
  query: PublishedPostFragment$key
}

const Fragment = graphql`
  fragment PublishedPostFragment on Post {
    reference
    ...PostPreviewContentFragment
    ...PostCopyLinkButtonFragment
    ...PostModerateButtonFragment
    ...PostArchiveButtonFragment
  }
`

export default function PublishedPost ({
  query
}: Props): JSX.Element {
  const data = useFragment(Fragment, query)

  return (
    <Stack spacing={1}>
      <HStack align='center' spacing={3} justify='space-between'>
        <Badge borderRadius='base' fontSize='sm' colorScheme='green'>
          <Trans>
            Published
          </Trans>
        </Badge>
        <PostMenu size='xs'>
          <PostCopyLinkButton query={data} />
          <PostArchiveButton query={data} />
          <PostModerateButton query={data} />
        </PostMenu>
      </HStack>
      <GridTile>
        <LinkTile to={`/p/${data.reference}`}>
          <PostPreviewContent query={data} />
        </LinkTile>
      </GridTile>
    </Stack>
  )
}
