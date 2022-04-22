import { graphql, useFragment } from 'react-relay'
import type { ReviewPostFragment$key } from '@//:artifacts/ReviewPostFragment.graphql'
import { Badge, Box, HStack, Stack } from '@chakra-ui/react'
import { GridTile } from '@//:modules/content/ContentSelection'
import PostPreviewContent from '@//:modules/content/Posts/components/PostData/PostPreviewContent/PostPreviewContent'
import { Trans } from '@lingui/macro'

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
      <HStack h={5} spacing={3} justify='flex-start'>
        <Badge borderRadius='base' fontSize='sm' colorScheme='purple'>
          <Trans>
            Review
          </Trans>
        </Badge>
        <Box h={5} />
      </HStack>
      <GridTile>
        <PostPreviewContent query={data} />
      </GridTile>
    </Stack>
  )
}
