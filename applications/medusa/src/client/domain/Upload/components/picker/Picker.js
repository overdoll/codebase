/**
 * @flow
 */
import type { Node } from 'react'
import { useRef } from 'react'
import { Flex, useToast } from '@chakra-ui/react'
import type { Uppy } from '@uppy/core'

type Props = {
  uppy: Uppy,
  onSelect: () => void,
  children: Node
};

/**
 * File picker - select files and add them to the list
 */
export default function Picker ({ uppy, onSelect, children }: Props): Node {
  const notify = useToast()

  const onChange = e => {
    const files = Array.from(e.target.files)
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

    onSelect()
  }

  const fileInput = useRef(null)

  const uploadClick = () => {
    fileInput.current.click()
  }

  return (
    <Flex onClick={uploadClick} cursor='pointer'>
      {children}
      <input ref={fileInput} data-testid='file' hidden type='file' multiple onChange={onChange} />
    </Flex>
  )
}
