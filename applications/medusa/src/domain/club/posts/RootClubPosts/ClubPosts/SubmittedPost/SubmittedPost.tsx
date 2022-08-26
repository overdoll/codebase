import { graphql, useFragment } from 'react-relay'
import { Badge, HStack, Popover, PopoverBody, PopoverContent, PopoverTrigger, Stack } from '@chakra-ui/react'
import { ClickableTile, GridTile } from '@//:modules/content/ContentSelection'
import PostPreviewContent from '@//:modules/content/Posts/components/PostData/PostPreviewContent/PostPreviewContent'
import { Trans } from '@lingui/macro'
import { SubmittedPostFragment$key } from '@//:artifacts/SubmittedPostFragment.graphql'

interface Props {
  query: SubmittedPostFragment$key
}

const Fragment = graphql`
  fragment SubmittedPostFragment on Post {
    ...PostPreviewContentFragment
    ...PostModerateButtonFragment
  }
`

export default function SubmittedPost ({
  query
}: Props): JSX.Element {
  const data = useFragment(Fragment, query)

  return (
    <Stack spacing={1}>
      <HStack h={7} spacing={3} justify='flex-start'>
        <Badge borderRadius='base' fontSize='sm' colorScheme='blue'>
          <Trans>
            SUBMITTED
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
                Your post is currently submitted. It will stay in this state until all of the content has been
                processed, after which it will move into a review stage.
              </Trans>
            </PopoverBody>
          </PopoverContent>
        </Popover>
      </GridTile>
    </Stack>
  )
}
