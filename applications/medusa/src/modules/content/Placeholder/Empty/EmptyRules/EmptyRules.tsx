import { Flex, Text } from '@chakra-ui/react'
import { t } from '@lingui/macro'
import { useLingui } from '@lingui/react'

export default function EmptyRules (): JSX.Element {
  const { i18n } = useLingui()

  return (
    <Flex px={4} py={4} bg='gray.800' borderRadius='md' h={100} justify='center' align='center'>
      <Text color='gray.200' textAlign='center' fontSize='lg'>
        {i18n._(t`No rules were found`)}
      </Text>
    </Flex>
  )
}
