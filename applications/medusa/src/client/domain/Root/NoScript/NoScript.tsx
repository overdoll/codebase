import { Center, Flex, Heading, Text } from '@chakra-ui/react'
import { Trans } from '@lingui/macro'

export default function NoScript (): JSX.Element {
  return (
    <noscript>
      <Center
        bg='gray.900'
        left={0}
        right={0}
        top={0}
        w='100vw'
        h='100vh'
        bottom={0}
        zIndex={100000000000000000000}
        position='absolute'
        overflowY='auto'
        overflowX='hidden'
      >
        <Flex direction='column' h='100vh' justify='center'>
          <Heading fontSize='2xl' color='gray.00'>
            <Trans>
              Enable JavaScript
            </Trans>
          </Heading>
          <Text fontSize='lg' color='gray.100'>
            <Trans>
              In order for the platform to function correctly, JavaScript must be enabled in
              your browser. Please enable it and refresh the page.
            </Trans>
          </Text>
        </Flex>
      </Center>
    </noscript>
  )
}
