/**
 * @flow
 */
import type { Node } from 'react'
import { useToast } from '@chakra-ui/react'
import type { Uppy } from '@uppy/core'

type Props = {
  uppy: Uppy,
  onSelect: () => void,
};

/**
 * File picker - select files and add them to the list
 */
export default function Picker ({ uppy, onSelect }: Props): Node {
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

  return <input data-testid='file' type='file' multiple onChange={onChange} />
}
