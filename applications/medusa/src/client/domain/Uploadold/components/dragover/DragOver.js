/**
 * @flow
 */
import type { Node } from 'react'
import { useState } from 'react'
import { Flex, useToast, Heading, useDisclosure } from '@chakra-ui/react'
import type { Uppy } from '@uppy/core'
import Icon from '@//:modules/content/Icon/Icon'
import InterfaceContentArchive
  from '@streamlinehq/streamlinehq/img/streamline-mini-bold/interface-essential/content/interface-content-archive.svg'
import { useTranslation } from 'react-i18next'

type Props = {
  uppy: Uppy,
  onSelect?: () => void,
  children: Node
};

export default function DragOver ({ uppy, onSelect, children, ...rest }: Props): Node {
  const notify = useToast()

  const [t] = useTranslation('upload')

  const { isOpen, onOpen, onClose } = useDisclosure()

  const [timeOut, changeTimeOut] = useState(null)

  // when an item is dropped into the area
  const handleDrop = e => {
    e.preventDefault()
    e.stopPropagation()

    const files = Array.from(e.dataTransfer.files)

    onClose()

    files.forEach(file => {
      try {
        uppy.addFile({
          source: 'file input',
          name: file.name,
          type: file.type,
          data: file
        })
      } catch (err) {
        notify({
          status: 'error',
          title: err.message,
          isClosable: true
        })
      }
    })
  }

  // when an item is hovered over the drop area - you want to show the user this is a "droppable" area
  const onDragOver = e => {
    e.preventDefault()
    e.stopPropagation()
    clearInterval(timeOut)
    onOpen()
  }

  const onDragLeave = e => {
    e.preventDefault()
    e.stopPropagation()

    clearInterval(timeOut)
    const timedOut = setTimeout(() => {
      onClose()
    }, 50)
    changeTimeOut(timedOut)
  }

  return (
    <Flex w='100%' h='100%' position='relative'>
      <Flex
        w='100%' onDrop={handleDrop} onDragOver={onDragOver}
        onDragEnter={onDragLeave} {...rest}
      >
        {children}
      </Flex>
      <Flex
        borderRadius={15} w='100%' h='100%' position='absolute'
        bg='dimmers.900' align='center' justify='center' borderStyle='dashed' borderColor='green.500' direction='column'
        borderWidth={4} pointerEvents='none' display={isOpen ? 'flex' : 'none'}
      >
        <Icon m={4} w={10} h={10} icon={InterfaceContentArchive} fill='green.500' />
        <Heading ml={16} mr={16} color='green.500' size='lg' align='center'>{t('begin.dropper')}
        </Heading>
      </Flex>
    </Flex>
  )
}
