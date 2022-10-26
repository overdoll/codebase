import { Icon } from '@//:modules/content/PageLayout'
import { LockLocked } from '@//:assets/icons'
import { HStack, Text } from '@chakra-ui/react'
import { Trans } from '@lingui/macro'

export default function SecureText (): JSX.Element {
  return (
    <HStack spacing={1}>
      <Icon icon={LockLocked} w={3} h={3} fill='gray.300' />
      <Text fontSize='sm' color='gray.300'>
        <Trans>
          Your payment is safe and secure
        </Trans>
      </Text>
    </HStack>
  )
}
