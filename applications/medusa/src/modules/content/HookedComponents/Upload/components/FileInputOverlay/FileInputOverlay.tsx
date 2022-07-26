import type { DragEvent, ReactNode } from 'react'
import { ChangeEvent, useRef } from 'react'
import { Box, Flex, useDisclosure } from '@chakra-ui/react'
import { Timeout } from '@//:types/components'
import { UppyType } from '../../types'
import { ClickableTile } from '../../../../ContentSelection'
import DragDropOverlay from './DragDropOverlay/DragDropOverlay'
import FileInput from '../../../../ThemeComponents/FileInput/FileInput'

interface Props {
  uppy: UppyType
  children: ReactNode
}

export default function FileInputOverlay ({
  uppy,
  children
}: Props): JSX.Element {
  const {
    isOpen,
    onOpen,
    onClose
  } = useDisclosure()

  const timeoutRef = useRef<Timeout | null>(null)

  const inputRef = useRef<HTMLInputElement>(null)

  const {
    restrictions,
    id
  } = uppy.opts

  const clearTimeoutRef = (): void => {
    if (timeoutRef.current != null) {
      clearTimeout(timeoutRef.current)
    }
  }

  const addFiles = (files): void => {
    const descriptors = files.map((file) => ({
      source: 'file input',
      name: file.name,
      type: file.type,
      data: file
    }))

    descriptors.forEach((file) => {
      try {
        uppy.addFile(file)
      } catch (err) {
        uppy.log(err)
      }
    })
  }

  const onChange = (e: ChangeEvent<HTMLInputElement>): void => {
    const input = e.target

    if ((input.files?.length) == null || input.files.length < 1) return

    uppy.log('Added files through input')
    addFiles(Array.from(input.files))
    // @ts-expect-error
    // see https://github.com/transloadit/uppy/blob/7534eddbbde752d94583397f91000b57c1dad0ad/packages/%40uppy/drag-drop/src/DragDrop.jsx#L79
    e.target.value = null
  }

  // when an item is dropped into the area
  const handleDrop = (e: DragEvent): void => {
    e.preventDefault()
    e.stopPropagation()
    clearTimeoutRef()
    timeoutRef.current = null

    onClose()
    const files = Array.from(e.dataTransfer.files)

    if (files.length < 1) return

    uppy.log('Added files through drag and drop')
    addFiles(Array.from(e.dataTransfer.files))
  }

  // when an item is hovered over the drop area - you want to show the user this is a "droppable" area
  const onDragOver = (e: DragEvent): void => {
    e.preventDefault()
    e.stopPropagation()

    const hasFiles = e.dataTransfer.types.some(type => type === 'Files')
    const { allowNewUpload } = uppy.getState()
    if (!hasFiles || !(allowNewUpload as boolean)) {
      e.dataTransfer.dropEffect = 'none'
      clearTimeoutRef()
      timeoutRef.current = null
      return
    }

    e.dataTransfer.dropEffect = 'copy'
    clearTimeoutRef()
    timeoutRef.current = null
    onOpen()
  }

  const onDragLeave = (e: DragEvent): void => {
    e.preventDefault()
    e.stopPropagation()

    clearTimeoutRef()
    // Timeout against flickering, this solution is taken from drag-drop library.
    // Solution with 'pointer-events: none' didn't work across browsers.
    timeoutRef.current = setTimeout(() => {
      onClose()
    }, 25)
  }

  return (
    <ClickableTile
      onClick={() => inputRef?.current?.click()}
      onDrop={handleDrop}
      onDragOver={onDragOver}
      onDragLeave={onDragLeave}
    >
      <Flex
        position='relative'
        borderRadius='inherit'
        w='100%'
        h='100%'
        pointerEvents='none'
      >
        <FileInput
          id={id}
          ref={inputRef}
          onChange={onChange}
          multiple={restrictions.maxNumberOfFiles !== 1}
          accept={restrictions.allowedFileTypes}
        />
        <Box h='100%' w='100%' pointerEvents='auto'>
          {children}
        </Box>
        <DragDropOverlay isOpen={isOpen} />
      </Flex>
    </ClickableTile>
  )
}
