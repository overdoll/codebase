import { graphql, useFragment } from 'react-relay'
import { Badge, HStack, Popover, PopoverBody, PopoverContent, PopoverTrigger, Stack } from '@chakra-ui/react'
import { ClickableTile, GridTile } from '@//:modules/content/ContentSelection'
import PostPreviewContent
  from '@//:modules/content/HookedComponents/Post/fragments/PostContent/PostPreviewContent/PostPreviewContent'
import PostMenu from '@//:modules/content/HookedComponents/Post/fragments/Interact/PostMenu/PostMenu'
import { Trans } from '@lingui/macro'
import type { RejectedPostFragment$key } from '@//:artifacts/RejectedPostFragment.graphql'
import PostModerateButton
  from '@//:modules/content/HookedComponents/Post/fragments/Interact/PostMenu/PostModerateButton/PostModerateButton'
import PostDeleteButton
  from '@//:modules/content/HookedComponents/Post/fragments/Interact/PostMenu/PostDeleteButton/PostDeleteButton'
import { ConnectionProp } from '@//:types/components'
import LinkInline from '@//:modules/content/ContentHints/LinkInline/LinkInline'
import { CLUB_GUIDELINES } from '@//:modules/constants/links'

interface Props extends ConnectionProp {
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
  query,
  connectionId
}: Props): JSX.Element {
  const data = useFragment(Fragment, query)

  return (
    <Stack spacing={1}>
      <HStack h={7} align='center' spacing={3} justify='space-between'>
        <Badge borderRadius='base' fontSize='sm' colorScheme='orange'>
          <Trans>
            REJECTED
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
                Your post was reviewed and it was determined that the contents did not comply with the{' '}
                <LinkInline
                  isExternal
                  color='teal.300'
                  href={CLUB_GUIDELINES}
                  fontSize='sm'
                >
                  <Trans>
                    Club Guidelines
                  </Trans>
                </LinkInline>. Please review the guidelines before posting again so that any future posts are not
                rejected.
              </Trans>
            </PopoverBody>
          </PopoverContent>
        </Popover>
      </GridTile>
    </Stack>
  )
}
