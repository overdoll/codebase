import { PostPlaceholder } from '../../../PageLayout'
import { Heading, Stack } from '@chakra-ui/react'
import { Trans } from '@lingui/macro'
import NotFoundFooter from '../NotFoundFooter/NotFoundFooter'

export default function NotFoundPublicPost (): JSX.Element {
  return (
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
  )
}
