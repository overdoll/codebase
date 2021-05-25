/**
 * @flow
 */
import type { Node } from 'react'
import Picker from '../../picker/Picker'
import type { Uppy } from '@uppy/core'

type Props = {
  uppy: Uppy,
  onAddFiles: () => void,
};

export default function Begin ({ uppy, onAddFiles }: Props): Node {
  return (
    <>
      pick files
      <Picker uppy={uppy} onSelect={onAddFiles} />
    </>
  )
}
