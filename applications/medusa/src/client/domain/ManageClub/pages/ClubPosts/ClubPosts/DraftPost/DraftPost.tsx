import { graphql, useFragment } from 'react-relay'
import type { DraftPostFragment$key } from '@//:artifacts/DraftPostFragment.graphql'
import { Badge, HStack, Stack } from '@chakra-ui/react'
import { GridTile, LinkTile } from '@//:modules/content/ContentSelection'
import PostPreviewContent
  from '../../../../../../../modules/content/Posts/components/PostContent/PostPreviewContent/PostPreviewContent'
import generatePath from '../../../../../../../modules/routing/generatePath'
import { useParams } from '@//:modules/routing'
import { PostMenu } from '@//:modules/content/Posts'
import { Trans } from '@lingui/macro'

interface Props {
  query: DraftPostFragment$key
}

const Fragment = graphql`
  fragment DraftPostFragment on Post {
    reference
    ...PostPreviewContentFragment
    ...PostMenuFragment
  }
`

export default function DraftPost ({
  query
}: Props): JSX.Element {
  const data = useFragment(Fragment, query)

  const match = useParams()

  const draftPostPath = (): string => {
    if (match?.slug == null) return ''

    return generatePath('/club/:slug/:entity', {
      slug: match?.slug,
      entity: 'create-post'
    })
  }

  return (
    <Stack spacing={1}>
      <HStack align='center' spacing={3} justify='space-between'>
        <Badge borderRadius='base' fontSize='sm' colorScheme='teal'>
          <Trans>
            DRAFT
          </Trans>
        </Badge>
        <PostMenu size='xs' query={data} />
      </HStack>
      <GridTile>
        <LinkTile to={`${draftPostPath()}?post=${data.reference}`}>
          <PostPreviewContent query={data} />
        </LinkTile>
      </GridTile>
    </Stack>
  )
}
