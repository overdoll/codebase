import { graphql, useFragment } from 'react-relay'
import type { ReviewPostFragment$key } from '@//:artifacts/ReviewPostFragment.graphql'
import { Badge, HStack, Stack } from '@chakra-ui/react'
import { GridTile } from '@//:modules/content/ContentSelection'
import PostPreviewContent
  from '../../../../../../../modules/content/Posts/components/PostContent/PostPreviewContent/PostPreviewContent'
import { PostMenu } from '@//:modules/content/Posts'
import { Trans } from '@lingui/macro'

interface Props {
  query: ReviewPostFragment$key
}

const Fragment = graphql`
  fragment ReviewPostFragment on Post {
    ...PostPreviewContentFragment
    ...PostMenuFragment
  }
`

export default function ReviewPost ({
  query
}: Props): JSX.Element {
  const data = useFragment(Fragment, query)

  return (
    <Stack spacing={1}>
      <HStack align='center' spacing={3} justify='space-between'>
        <Badge fontSize='sm' colorScheme='purple'>
          <Trans>
            Review
          </Trans>
        </Badge>
        <PostMenu size='sm' query={data} />
      </HStack>
      <GridTile>
        <PostPreviewContent query={data} />
      </GridTile>
    </Stack>
  )
}
