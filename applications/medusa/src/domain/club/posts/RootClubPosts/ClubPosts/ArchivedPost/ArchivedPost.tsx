import { graphql, useFragment } from 'react-relay'
import type { ArchivedPostFragment$key } from '@//:artifacts/ArchivedPostFragment.graphql'
import { Badge, HStack, Stack } from '@chakra-ui/react'
import { GridTile, LinkTile } from '@//:modules/content/ContentSelection'
import PostPreviewContent from '@//:modules/content/Posts/components/PostData/PostPreviewContent/PostPreviewContent'
import { PostMenu } from '@//:modules/content/Posts'
import { Trans } from '@lingui/macro'
import PostModerateButton
  from '@//:modules/content/Posts/components/PostInteraction/PostMenu/PostModerateButton/PostModerateButton'
import PostUnArchiveButton
  from '@//:modules/content/Posts/components/PostInteraction/PostMenu/PostUnArchiveButton/PostUnArchiveButton'

interface Props {
  query: ArchivedPostFragment$key
}

const Fragment = graphql`
  fragment ArchivedPostFragment on Post {
    reference
    club {
      slug
    }
    ...PostPreviewContentFragment
    ...PostModerateButtonFragment
    ...PostUnArchiveButtonFragment
  }
`

export default function ArchivedPost ({
  query
}: Props): JSX.Element {
  const data = useFragment(Fragment, query)

  return (
    <Stack spacing={1}>
      <HStack h={7} align='center' spacing={3} justify='space-between'>
        <Badge borderRadius='base' fontSize='sm' colorScheme='green'>
          <Trans>
            ARCHIVED
          </Trans>
        </Badge>
        <PostMenu size='xs'>
          <PostUnArchiveButton query={data} />
          <PostModerateButton query={data} />
        </PostMenu>
      </HStack>
      <GridTile>
        <LinkTile href={{
          pathname: '/[slug]/post/[reference]',
          query: {
            slug: data.club.slug,
            reference: data.reference
          }
        }}
        >
          <PostPreviewContent query={data} />
        </LinkTile>
      </GridTile>
    </Stack>
  )
}
