import { graphql, useFragment } from 'react-relay'
import { Badge, HStack, Popover, PopoverBody, PopoverContent, PopoverTrigger, Stack, Text } from '@chakra-ui/react'
import { ClickableTile, GridTile } from '@//:modules/content/ContentSelection'
import PostPreviewContent from '@//:modules/content/Posts/components/PostData/PostPreviewContent/PostPreviewContent'
import { PostMenu } from '@//:modules/content/Posts'
import { Trans } from '@lingui/macro'
import type { RejectedPostFragment$key } from '@//:artifacts/RejectedPostFragment.graphql'
import PostModerateButton
  from '@//:modules/content/Posts/components/PostInteraction/PostMenu/PostModerateButton/PostModerateButton'
import PostDeleteButton
  from '@//:modules/content/Posts/components/PostInteraction/PostMenu/PostDeleteButton/PostDeleteButton'
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
            <PopoverBody>
              <Stack>
                <Text color='gray.00' fontSize='sm'>
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
                    </LinkInline>.
                  </Trans>
                </Text>
                <Text color='gray.00' fontSize='sm'>
                  <Trans>
                    Please review the guidelines before posting again so that any future posts are not rejected.
                  </Trans>
                </Text>
              </Stack>
            </PopoverBody>
          </PopoverContent>
        </Popover>
      </GridTile>
    </Stack>
  )
}
