/**
 * @flow
 */
import type { Node } from 'react';
import Picker from '../../picker/Picker';

type Props = {
  uppy: any,
  onAddFiles: any,
};

export default function Begin({ uppy, onAddFiles }: Props): Node {
  return (
    <>
      pick files
      <Picker uppy={uppy} onSelect={onAddFiles} />
    </>
  );
}
