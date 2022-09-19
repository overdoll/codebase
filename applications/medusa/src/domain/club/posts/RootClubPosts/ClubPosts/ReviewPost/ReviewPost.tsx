import { graphql, useFragment } from 'react-relay'
import type { ReviewPostFragment$key } from '@//:artifacts/ReviewPostFragment.graphql'
import { Badge, HStack, Popover, PopoverBody, PopoverContent, PopoverTrigger, Stack } from '@chakra-ui/react'
import { ClickableTile, GridTile } from '@//:modules/content/ContentSelection'
import PostPreviewContent from '@//:modules/content/HookedComponents/Post/fragments/PostContent/PostPreviewContent/PostPreviewContent'
import { Trans } from '@lingui/macro'
import { CLUB_GUIDELINES } from '@//:modules/constants/links'
import LinkInline from '@//:modules/content/ContentHints/LinkInline/LinkInline'

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
      <HStack h={7} spacing={3} justify='flex-start'>
        <Badge borderRadius='base' fontSize='sm' colorScheme='purple'>
          <Trans>
            REVIEW
          </Trans>
        </Badge>
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
                Your post is under review. It will be checked against the{' '}
                <LinkInline
                  isExternal
                  color='teal.300'
                  href={CLUB_GUIDELINES}
                  fontSize='sm'
                >
                  <Trans>
                    Club Guidelines
                  </Trans>
                </LinkInline> to ensure that it is allowed on the platform. You can expect your post to be reviewed
                anywhere between a few minutes to a day from submission.
              </Trans>
            </PopoverBody>
          </PopoverContent>
        </Popover>
      </GridTile>
    </Stack>
  )
}
