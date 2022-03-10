import { Flex, Text } from '@chakra-ui/react'
import { Trans } from '@lingui/macro'

export default function EmptyTransactions (): JSX.Element {
  return (
    <Flex px={4} py={4} bg='gray.800' borderRadius='md' h={100} justify='center' align='center'>
      <Text color='gray.200' textAlign='center' fontSize='lg'>
        <Trans>
          No transactions were found
        </Trans>
      </Text>
    </Flex>
  )
}
