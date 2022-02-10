import NotFound from '../../../../routing/NotFound'
import { Center, Heading, Stack } from '@chakra-ui/react'
import { Trans } from '@lingui/macro'
import NotFoundFooter from '../NotFoundFooter/NotFoundFooter'

export default function NotFoundClub (): JSX.Element {
  return (
    <NotFound>
      <Center>
        <Stack spacing={8}>
          <Heading fontSize='2xl' color='gray.00'>
            <Trans>
              This club was not found
            </Trans>
          </Heading>
          <NotFoundFooter />
        </Stack>
      </Center>
    </NotFound>
  )
}