import { PostPlaceholder } from '../../../PageLayout'
import { Heading, Stack } from '@chakra-ui/react'
import { Trans } from '@lingui/macro'
import NotFoundFooter from '../NotFoundFooter/NotFoundFooter'
import RootPublicPostRichObject
  from '../../../../../domain/slug/post/RootPublicPost/DisposePublicPost/ResultPublicPost/EmptyPublicPost/RootPublicPostRichObject/RootPublicPostRichObject'

export default function NotFoundPublicPost (): JSX.Element {
  return (
    <>
      <RootPublicPostRichObject />
      <PostPlaceholder>
        <Stack spacing={8}>
          <Heading fontSize='2xl' color='gray.00'>
            <Trans>
              This post was not found
            </Trans>
          </Heading>
          <NotFoundFooter />
        </Stack>
      </PostPlaceholder>
    </>
  )
}
