import { graphql, useFragment } from 'react-relay'
import { Badge, HStack, Stack } from '@chakra-ui/react'
import { GridTile } from '@//:modules/content/ContentSelection'
import PostPreviewContent
  from '@//:modules/content/Posts/components/PostData/PostPreviewContent/PostPreviewContent'
import { PostMenu } from '@//:modules/content/Posts'
import { Trans } from '@lingui/macro'
import type { RejectedPostFragment$key } from '@//:artifacts/RejectedPostFragment.graphql'
import PostModerateButton
  from '@//:modules/content/Posts/components/PostInteraction/PostMenu/PostModerateButton/PostModerateButton'
import PostDeleteButton
  from '@//:modules/content/Posts/components/PostInteraction/PostMenu/PostDeleteButton/PostDeleteButton'

interface Props {
  query: RejectedPostFragment$key
}

const Fragment = graphql`
  fragment RejectedPostFragment on Post {
    ...PostPreviewContentFragment
    ...PostModerateButtonFragment
    ...PostDeleteButtonFragment
  }
`

export default function RejectedPost ({
  query
}: Props): JSX.Element {
  const data = useFragment(Fragment, query)

  return (
    <Stack spacing={1}>
      <HStack align='center' spacing={3} justify='space-between'>
        <Badge borderRadius='base' fontSize='sm' colorScheme='orange'>
          <Trans>
            Rejected
          </Trans>
        </Badge>
        <PostMenu h={5} size='xs'>
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