import { graphql, useFragment } from 'react-relay'
import type { PublishedPostFragment$key } from '@//:artifacts/PublishedPostFragment.graphql'
import { Badge, HStack, Stack } from '@chakra-ui/react'
import { GridTile, LinkTile } from '@//:modules/content/ContentSelection'
import PostPreviewContent
  from '../../../../../../../modules/content/Posts/components/PostContent/PostPreviewContent/PostPreviewContent'
import { PostMenu } from '@//:modules/content/Posts'
import { Trans } from '@lingui/macro'

interface Props {
  query: PublishedPostFragment$key
}

const Fragment = graphql`
  fragment PublishedPostFragment on Post {
    reference
    ...PostPreviewContentFragment
    ...PostMenuFragment
  }
`

export default function PublishedPost ({
  query
}: Props): JSX.Element {
  const data = useFragment(Fragment, query)

  return (
    <Stack spacing={1}>
      <HStack align='center' spacing={3} justify='space-between'>
        <Badge fontSize='sm' colorScheme='green'>
          <Trans>
            Published
          </Trans>
        </Badge>
        <PostMenu size='sm' query={data} />
      </HStack>
      <GridTile>
        <LinkTile to={`/p/${data.reference}`}>
          <PostPreviewContent query={data} />
        </LinkTile>
      </GridTile>
    </Stack>
  )
}
