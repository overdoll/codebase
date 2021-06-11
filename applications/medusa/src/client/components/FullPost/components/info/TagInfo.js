/**
 * @flow
 */
import type { Node } from 'react'
import { Flex, IconButton, Heading, useDisclosure } from '@chakra-ui/react'
import InspectModal from '../modal/InspectModal'
import Icon from '@//:modules/content/icon/Icon'

type Props = {
  count: number,
  icon: string,
  children: Node,
}

export default function TagInfo ({ count, icon, children }: Props): Node {
  const { isOpen, onOpen, onClose } = useDisclosure()

  return (
    <>
      <Flex position='relative'>
        <IconButton
          borderRadius='2xl'
          variant='outline'
          colorScheme='gray'
          size='lg'
          onClick={onOpen}
          icon={
            <Icon
              icon={icon} w={6} h={6}
              fill='gray.500'
            />
          }
        />
        <Flex
          transform='translateX(25%) translateY(-25%)' userSelect='none' pointerEvents='none' w={6} h={6}
          borderRadius='full' bg='gray.500' right={0}
          position='absolute' align='center' justify='center'
        >
          <Heading color='gray.200' size='sm'>{count}</Heading>
        </Flex>
      </Flex>
      <InspectModal
        onClose={onClose} isOpen={isOpen}
      >{children}
      </InspectModal>
    </>
  )
}
