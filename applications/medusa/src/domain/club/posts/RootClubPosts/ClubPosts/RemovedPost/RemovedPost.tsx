import { graphql, useFragment } from 'react-relay'
import type { RemovedPostFragment$key } from '@//:artifacts/RemovedPostFragment.graphql'
import { Badge, HStack, Popover, PopoverBody, PopoverContent, PopoverTrigger, Stack } from '@chakra-ui/react'
import { ClickableTile, GridTile } from '@//:modules/content/ContentSelection'
import PostPreviewContent from '@//:modules/content/HookedComponents/Post/fragments/PostContent/PostPreviewContent/PostPreviewContent'
import PostMenu from '@//:modules/content/HookedComponents/Post/fragments/Interact/PostMenu/PostMenu'
import { Trans } from '@lingui/macro'
import PostModerateButton
  from '@//:modules/content/HookedComponents/Post/fragments/Interact/PostMenu/PostModerateButton/PostModerateButton'
import PostDeleteButton
  from '@//:modules/content/HookedComponents/Post/fragments/Interact/PostMenu/PostDeleteButton/PostDeleteButton'
import { ConnectionProp } from '@//:types/components'
import LinkInline from '@//:modules/content/ContentHints/LinkInline/LinkInline'
import { CLUB_GUIDELINES } from '@//:modules/constants/links'

interface Props extends ConnectionProp {
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
  query,
  connectionId
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
          <PostDeleteButton connectionId={connectionId} query={data} />
          <PostModerateButton query={data} />
        </PostMenu>
      </HStack>
      <GridTile>
        <Popover>
          <PopoverTrigger>
            <ClickableTile>
              <PostPreviewContent query={data} />
            </ClickableTile>
          </PopoverTrigger>
          <PopoverContent>
            <PopoverBody fontSize='sm'>
              <Trans>
                This post was removed for failing to comply with the{' '}
                <LinkInline
                  isExternal
                  color='teal.300'
                  href={CLUB_GUIDELINES}
                  fontSize='sm'
                >
                  <Trans>
                    Club Guidelines
                  </Trans>
                </LinkInline>.
              </Trans>
            </PopoverBody>
          </PopoverContent>
        </Popover>
      </GridTile>
    </Stack>
  )
}
