import { graphql, useFragment } from 'react-relay'
import type { DraftPostFragment$key } from '@//:artifacts/DraftPostFragment.graphql'
import { Badge, HStack, Stack } from '@chakra-ui/react'
import { GridTile, LinkTile } from '@//:modules/content/ContentSelection'
import PostPreviewContent from '@//:modules/content/Posts/components/PostData/PostPreviewContent/PostPreviewContent'
import { PostMenu } from '@//:modules/content/Posts'
import { Trans } from '@lingui/macro'
import PostModerateButton
  from '@//:modules/content/Posts/components/PostInteraction/PostMenu/PostModerateButton/PostModerateButton'
import { MenuLinkItem } from '@//:modules/content/ThemeComponents/Menu/Menu'
import { ContentBrushPen } from '@//:assets/icons'
import PostDeleteButton
  from '@//:modules/content/Posts/components/PostInteraction/PostMenu/PostDeleteButton/PostDeleteButton'
import { useRouter } from 'next/router'

interface Props {
  query: DraftPostFragment$key
}

const Fragment = graphql`
  fragment DraftPostFragment on Post {
    reference
    ...PostPreviewContentFragment
    ...PostModerateButtonFragment
    ...PostDeleteButtonFragment
  }
`

export default function DraftPost ({
  query
}: Props): JSX.Element {
  const data = useFragment(Fragment, query)

  const { query: { slug } } = useRouter()

  return (
    <Stack spacing={1}>
      <HStack h={7} align='center' spacing={3} justify='space-between'>
        <Badge borderRadius='base' fontSize='sm' colorScheme='teal'>
          <Trans>
            DRAFT
          </Trans>
        </Badge>
        <PostMenu size='xs'>
          <MenuLinkItem
            href={{
              pathname: '/club/[slug]/create-post',
              query: {
                slug: slug,
                post: data.reference
              }
            }}
            text={(
              <Trans>
                Edit Draft
              </Trans>)}
            icon={ContentBrushPen}
          />
          <PostDeleteButton query={data} />
          <PostModerateButton query={data} />
        </PostMenu>
      </HStack>
      <GridTile>
        <LinkTile href={{
          pathname: '/club/[slug]/create-post',
          query: {
            slug: slug,
            post: data.reference
          }
        }}
        >
          <PostPreviewContent query={data} />
        </LinkTile>
      </GridTile>
    </Stack>
  )
}
