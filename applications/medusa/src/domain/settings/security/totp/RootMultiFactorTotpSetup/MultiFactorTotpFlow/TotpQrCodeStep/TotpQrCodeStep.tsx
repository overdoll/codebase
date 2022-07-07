import { Box, Flex, Heading, Stack, Text } from '@chakra-ui/react'
import { Trans } from '@lingui/macro'
import CopyCodeToClipboard from '@//:modules/content/ContentHints/CopyCodeToClipboard/CopyCodeToClipboard'
import NextImage from '@//:modules/content/DataDisplay/NextImage/NextImage'

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
      <Flex justify='center' align='center'>
        <Flex
          borderRadius='md'
          align='center'
          justify='center'
          position='relative'
          p={2}
          bg='gray.00'
        >
          <NextImage
            height={180}
            width={180}
            priority
            alt='thumbnail'
            src={image ?? ''}
            style={{
              imageRendering: 'pixelated'
            }}
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
