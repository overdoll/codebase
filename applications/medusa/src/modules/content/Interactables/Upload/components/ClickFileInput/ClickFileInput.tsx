import { ChangeEvent, ReactNode, useRef } from 'react'
import { Flex, FlexProps } from '@chakra-ui/react'
import { UppyType } from '../../types'

interface Props extends FlexProps {
  uppy: UppyType
  onSelect?: () => void
  children: ReactNode
}

/**
 * File picker - select files and add them to the list
 */
export default function ClickFileInput ({
  uppy,
  onSelect,
  children,
  ...rest
}: Props): JSX.Element {
  const fileInput = useRef<HTMLInputElement>(null)

  const {
    restrictions,
    id
  } = uppy.opts

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

  const uploadClick = (): void => {
    fileInput?.current?.click()
  }

  return (
    <Flex w='100%' onClick={uploadClick} cursor='pointer' {...rest}>
      {children}
      <input
        name={id}
        ref={fileInput}
        data-testid='click-file-picker'
        hidden
        type='file'
        onChange={onChange}
        multiple={restrictions.maxNumberOfFiles !== 1}
        accept={restrictions.allowedFileTypes}
      />
    </Flex>
  )
}
