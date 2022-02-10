import NotFound from '../../../../routing/NotFound'
import { Center, Heading, Stack } from '@chakra-ui/react'
import { Trans } from '@lingui/macro'
import NotFoundFooter from '../NotFoundFooter/NotFoundFooter'

export default function NotFoundAccount (): JSX.Element {
  return (
    <NotFound>
      <Center>
        <Stack spacing={8}>
          <Heading fontSize='2xl' color='gray.00'>
            <Trans>
              This account was not found
            </Trans>
          </Heading>
          <NotFoundFooter />
        </Stack>
      </Center>
    </NotFound>
  )
}
