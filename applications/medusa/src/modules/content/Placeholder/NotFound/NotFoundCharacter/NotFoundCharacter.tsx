import { Center, Heading, Stack } from '@chakra-ui/react'
import { Trans } from '@lingui/macro'
import NotFoundFooter from '../NotFoundFooter/NotFoundFooter'
import RootSearchRichObject from '../../../../../common/rich-objects/RootSearchRichObject/RootSearchRichObject'

export default function NotFoundCharacter (): JSX.Element {
  return (
    <>

      <Center>
        <Stack spacing={8}>
          <Heading fontSize='2xl' color='gray.00'>
            <Trans>
              This character was not found
            </Trans>
          </Heading>
          <NotFoundFooter />
        </Stack>
      </Center>
    </>

  )
}
