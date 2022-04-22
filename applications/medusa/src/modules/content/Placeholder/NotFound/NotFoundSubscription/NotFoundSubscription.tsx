import { Center, Heading, Stack } from '@chakra-ui/react'
import { Trans } from '@lingui/macro'
import NotFoundFooter from '../NotFoundFooter/NotFoundFooter'

export default function NotFoundSubscription (): JSX.Element {
  return (
    <Center>
      <Stack spacing={8}>
        <Heading fontSize='2xl' color='gray.00'>
          <Trans>
            This subscription was not found
          </Trans>
        </Heading>
        <NotFoundFooter />
      </Stack>
    </Center>
  )
}
