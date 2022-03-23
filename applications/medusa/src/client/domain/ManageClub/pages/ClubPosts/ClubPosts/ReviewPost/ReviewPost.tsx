import { graphql, useFragment } from 'react-relay'
import type { ReviewPostFragment$key } from '@//:artifacts/ReviewPostFragment.graphql'
import { Badge, HStack, Stack } from '@chakra-ui/react'
import { GridTile } from '@//:modules/content/ContentSelection'
import PostPreviewContent
  from '../../../../../../../modules/content/Posts/components/PostData/PostPreviewContent/PostPreviewContent'
import { PostMenu } from '@//:modules/content/Posts'
import { Trans } from '@lingui/macro'
import PostModerateButton
  from '@//:modules/content/Posts/components/PostInteraction/PostMenu/PostModerateButton/PostModerateButton'

interface Props {
  query: ReviewPostFragment$key
}

const Fragment = graphql`
  fragment ReviewPostFragment on Post {
    ...PostPreviewContentFragment
    ...PostModerateButtonFragment
  }
`

export default function ReviewPost ({
  query
}: Props): JSX.Element {
  const data = useFragment(Fragment, query)

  return (
    <Stack spacing={1}>
      <HStack align='center' spacing={3} justify='space-between'>
        <Badge borderRadius='base' fontSize='sm' colorScheme='purple'>
          <Trans>
            Review
          </Trans>
        </Badge>
        <PostMenu size='xs'>
          <PostModerateButton query={data} />
        </PostMenu>
      </HStack>
      <GridTile>
        <PostPreviewContent query={data} />
      </GridTile>
    </Stack>
  )
}
