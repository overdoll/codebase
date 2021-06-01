/**
 * @flow
 */
import type { Node } from 'react'
import { Flex, IconButton, Heading } from '@chakra-ui/react'
import { useState } from 'react'
import InspectModal from '@//:modules/content/posts/full/components/modal/InspectModal'
import Icon from '@//:modules/content/icon/Icon'
import { createPortal } from 'react-dom'
import RootElement from '@//:modules/utilities/RootElement'

type Props = {
  count: number,
  icon: string,
  displayData: Node,
}

export default function TagInfo ({ count, icon, displayData }: Props): Node {
  const [open, setOpen] = useState(false)

  const onOpen = () => {
    setOpen(!open)
  }

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
      {open &&
      createPortal(
        <InspectModal
          onClose={() => {
            setOpen(false)
          }} isOpen={open}
        >{displayData}
        </InspectModal>,
        RootElement
      )}
    </>
  )
}
