import { Box, Flex, Heading, Skeleton, Stack, Text } from '@chakra-ui/react'
import { Trans } from '@lingui/macro'
import SuspenseImage from '@//:modules/operations/SuspenseImage'
import CopyCodeToClipboard
  from '../../../../../../../modules/content/ContentHints/CopyCodeToClipboard/CopyCodeToClipboard'

interface Props {
  secret: string | undefined
  image: string | undefined
}

export default function TotpQrCodeStep ({
  secret,
  image
}: Props): JSX.Element {
  return (
    <Stack spacing={2}>
      <Flex m={2} justify='center' align='center'>
        <Flex
          h={32}
          w={32}
          borderRadius='md'
          bg='gray.00'
          align='center'
          justify='center'
        >
          <SuspenseImage
            alt='thumbnail'
            src={image ?? ''}
            fallback={<Skeleton w='100%' h='100%' />}
          />
        </Flex>
      </Flex>
      <Box m={2}>
        <Heading fontSize='lg' color='gray.00'>
          <Trans>
            Scan the QR Code
          </Trans>
        </Heading>
        <Text color='gray.100' fontSize='sm'>
          <Trans>
            Open the authenticator app and scan the image. You must scan the code through the app or it won't work.
          </Trans>
        </Text>
        <Text mt={2} color='gray.100' fontSize='sm'>
          <Trans>
            Alternatively, you can enter the following secret code into the app
          </Trans>
        </Text>
        <CopyCodeToClipboard mt={2}>
          {secret ?? ''}
        </CopyCodeToClipboard>
      </Box>
    </Stack>
  )
}
