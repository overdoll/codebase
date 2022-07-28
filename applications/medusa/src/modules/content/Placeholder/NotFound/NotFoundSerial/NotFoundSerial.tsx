import { Center, Heading, Stack } from '@chakra-ui/react'
import { Trans } from '@lingui/macro'
import NotFoundFooter from '../NotFoundFooter/NotFoundFooter'
import RootSearchRichObject from '../../../../../common/rich-objects/search/RootSearchRichObject/RootSearchRichObject'

export default function NotFoundSerial (): JSX.Element {
  return (
    <>
      <RootSearchRichObject />
      <Center>
        <Stack spacing={8}>
          <Heading fontSize='2xl' color='gray.00'>
            <Trans>
              This series was not found
            </Trans>
          </Heading>
          <NotFoundFooter />
        </Stack>
      </Center>
    </>

  )
}
