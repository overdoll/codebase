import { graphql, useFragment } from 'react-relay'
import type { RemovedPostFragment$key } from '@//:artifacts/RemovedPostFragment.graphql'
import { Badge, HStack, Stack } from '@chakra-ui/react'
import { GridTile } from '@//:modules/content/ContentSelection'
import PostPreviewContent from '@//:modules/content/Posts/components/PostData/PostPreviewContent/PostPreviewContent'
import { PostMenu } from '@//:modules/content/Posts'
import { Trans } from '@lingui/macro'
import PostModerateButton
  from '@//:modules/content/Posts/components/PostInteraction/PostMenu/PostModerateButton/PostModerateButton'
import PostDeleteButton
  from '@//:modules/content/Posts/components/PostInteraction/PostMenu/PostDeleteButton/PostDeleteButton'

interface Props {
  query: RemovedPostFragment$key
}

const Fragment = graphql`
  fragment RemovedPostFragment on Post {
    ...PostPreviewContentFragment
    ...PostModerateButtonFragment
    ...PostDeleteButtonFragment
  }
`

export default function RemovedPost ({
  query
}: Props): JSX.Element {
  const data = useFragment(Fragment, query)

  return (
    <Stack spacing={1}>
      <HStack h={7} align='center' spacing={3} justify='space-between'>
        <Badge borderRadius='base' fontSize='sm' colorScheme='orange'>
          <Trans>
            REMOVED
          </Trans>
        </Badge>
        <PostMenu size='xs'>
          <PostDeleteButton query={data} />
          <PostModerateButton query={data} />
        </PostMenu>
      </HStack>
      <GridTile>
        <PostPreviewContent query={data} />
      </GridTile>
    </Stack>
  )
}
