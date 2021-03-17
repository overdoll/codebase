/**
 * @flow
 */
import type { Node } from 'react';
import Picker from '../../picker/Picker';

type Props = {
  uppy: any,
  onSelectFiles: any,
};

export default function Begin({ uppy, onSelectFiles }: Props): Node {
  return (
    <>
      pick files
      <Picker uppy={uppy} onSelect={onSelectFiles} />
    </>
  );
}
