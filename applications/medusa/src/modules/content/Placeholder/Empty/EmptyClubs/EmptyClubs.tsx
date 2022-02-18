import { Flex, Text } from '@chakra-ui/react'
import { t } from '@lingui/macro'
import { useLingui } from '@lingui/react'

interface Props {
  hint?: string | undefined | null
}

export default function EmptyClubs ({ hint }: Props): JSX.Element {
  const { i18n } = useLingui()

  return (
    <Flex px={4} py={4} bg='gray.800' borderRadius='md' h={100} justify='center' align='center'>
      <Text color='gray.200' textAlign='center' fontSize='lg'>
        {i18n._(t`No clubs were found${hint != null ? ` with the name ${hint}` : ''}`)}
      </Text>
    </Flex>
  )
}
