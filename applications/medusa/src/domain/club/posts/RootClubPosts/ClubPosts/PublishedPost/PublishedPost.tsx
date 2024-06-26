import { graphql, useFragment } from 'react-relay'
import type { PublishedPostFragment$key } from '@//:artifacts/PublishedPostFragment.graphql'
import { Badge, HStack, Stack } from '@chakra-ui/react'
import { GridTile, LinkTile } from '@//:modules/content/ContentSelection'
import PostPreviewContent
  from '@//:modules/content/HookedComponents/Post/fragments/PostContent/PostPreviewContent/PostPreviewContent'
import PostMenu from '@//:modules/content/HookedComponents/Post/fragments/Interact/PostMenu/PostMenu'
import { Trans } from '@lingui/macro'
import PostModerateButton
  from '@//:modules/content/HookedComponents/Post/fragments/Interact/PostMenu/PostModerateButton/PostModerateButton'
import PostArchiveButton
  from '@//:modules/content/HookedComponents/Post/fragments/Interact/PostMenu/PostArchiveButton/PostArchiveButton'
import PostViewButton
  from '@//:modules/content/HookedComponents/Post/fragments/Interact/PostMenu/PostViewButton/PostViewButton'
import PostEditButton
  from '@//:modules/content/HookedComponents/Post/fragments/Interact/PostMenu/PostEditButton/PostEditButton'
import PostAnalyticsButton
  from '@//:modules/content/HookedComponents/Post/fragments/Interact/PostMenu/PostAnalyticsButton/PostAnalyticsButton'

interface Props {
  query: PublishedPostFragment$key
}

const Fragment = graphql`
  fragment PublishedPostFragment on Post {
    reference
    ...PostPreviewContentFragment
    ...PostModerateButtonFragment
    ...PostArchiveButtonFragment
    ...PostViewButtonFragment
    ...PostEditButtonFragment
    ...PostAnalyticsButtonFragment
    club {
      slug
    }
  }
`

export default function PublishedPost ({
  query
}: Props): JSX.Element {
  const data = useFragment(Fragment, query)

  return (
    <Stack spacing={1}>
      <HStack h={7} align='center' spacing={3} justify='space-between'>
        <Badge borderRadius='base' fontSize='sm' colorScheme='green'>
          <Trans>
            PUBLISHED
          </Trans>
        </Badge>
        <PostMenu size='xs'>
          <PostViewButton query={data} />
          <PostEditButton query={data} />
          <PostAnalyticsButton query={data} />
          <PostArchiveButton query={data} />
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
