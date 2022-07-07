import type { DragEvent, ReactNode } from 'react'
import { useRef, useState } from 'react'
import { Flex, useDisclosure } from '@chakra-ui/react'
import { Timeout } from '@//:types/components'
import { UppyType } from '../../types'

interface Props {
  uppy: UppyType
  children: ReactNode
}

export default function DragDropFileInput ({
  uppy,
  children,
  ...rest
}: Props): JSX.Element {
  const {
    isOpen,
    onOpen,
    onClose
  } = useDisclosure()

  const [timer, setTimer] = useState<Timeout>(setTimeout(() => ({})))

  const fileInput = useRef<HTMLInputElement>(null)

  const {
    restrictions,
    id
  } = uppy.opts

  // when an item is dropped into the area
  const handleDrop = (e: DragEvent): void => {
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

      }
    })
  }

  // when an item is hovered over the drop area - you want to show the user this is a "droppable" area
  const onDragOver = (e: DragEvent): void => {
    e.preventDefault()
    e.stopPropagation()

    clearTimeout(timer)
    onOpen()
  }

  const onDragLeave = (e: DragEvent): void => {
    e.preventDefault()
    e.stopPropagation()

    console.log('drag left')

    clearTimeout(timer)

    const timedOut = setTimeout(() => {
      onClose()
    }, 50)
    setTimer(timedOut)
  }

  return (
    <Flex borderRadius='md' w='100%' h='100%' position='relative'>
      <input
        name={id}
        ref={fileInput}
        data-testid='drag-drop-file-picker'
        hidden
        type='file'
        multiple={restrictions.maxNumberOfFiles !== 1}
        accept={restrictions.allowedFileTypes}
      />
      <Flex
        w='100%'
        h='100%'
        onDrop={handleDrop}
        onDragOver={onDragOver}
        onDragEnter={onDragLeave}
        {...rest}
      >
        {children}
      </Flex>
      <Flex
        borderRadius='inherit'
        w='100%'
        h='100%'
        position='absolute'
        align='center'
        justify='center'
        pointerEvents='none'
        display={isOpen ? 'flex' : 'none'}
      >
        <></>
      </Flex>
      <Flex
        borderRadius='inherit'
        w='100%'
        h='100%'
        position='absolute'
        align='center'
        justify='center'
        backdropFilter='auto'
        backdropBlur='3px'
        filter='blur(5px)'
        pointerEvents='none'
        bg='dimmers.500'
        display={isOpen ? 'flex' : 'none'}
      />
    </Flex>
  )
}
