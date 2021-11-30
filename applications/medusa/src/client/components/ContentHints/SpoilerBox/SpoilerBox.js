/**
 * @flow
 */
import type { Node } from 'react'
import { Stack, useDisclosure, Text, Box, Flex } from '@chakra-ui/react'
import Button from '@//:modules/form/Button'
import { useTranslation } from 'react-i18next'

type Props = {
  children: Node,
  text: string
};

export default function SpoilerBox ({ children, text }: Props): Node {
  const { isOpen, onToggle } = useDisclosure()

  const [t] = useTranslation('settings')

  return (
    <Button
      fontSize='sm' fontWeight='normal' fontFamily='body' p={0} onClick={onToggle}
      variant='link'
      color='gray.200'
    >
      <Flex w='100%' justify='flex-start'>
        {isOpen
          ? (children)
          : (
            <Text>
              {text || t('button.reveal')}
            </Text>
            )}
      </Flex>
    </Button>
  )
}
