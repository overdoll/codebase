import { ChangeEvent, ReactNode, useRef } from 'react'
import { Flex, HTMLChakraProps } from '@chakra-ui/react'
import type { Uppy } from '@uppy/core'

interface Props extends HTMLChakraProps<any> {
  uppy: Uppy
  onSelect?: () => void
  children: ReactNode
}

/**
 * File picker - select files and add them to the list
 */
export default function FilePicker ({
  uppy,
  onSelect,
  children,
  ...rest
}: Props): JSX.Element {
  const onChange = (e: ChangeEvent<HTMLInputElement>): void => {
    const input = e.target

    if ((input.files?.length) == null) {
      return
    }

    const files = Array.from(input.files)
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

  const fileInput = useRef<HTMLInputElement>(null)

  const uploadClick = (): void => {
    fileInput?.current?.click()
  }

  return (
    <Flex w='100%' onClick={uploadClick} cursor='pointer' {...rest}>
      {children}
      <input id='file' ref={fileInput} data-testid='file' hidden type='file' multiple onChange={onChange} />
    </Flex>
  )
}