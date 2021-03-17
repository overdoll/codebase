/**
 * @flow
 */
import type { Node } from 'react';
import { useUppy } from '@uppy/react';
import Uppy from './components/uppy/Uppy';
import Begin from './components/steps/begin/Begin';

type Props = {};

export default function Upload(props: Props): Node {
  const uppy = useUppy(() => {
    return Uppy;
  });

  uppy.on('thumbnail:generated', (file, preview) => {
    const img = document.createElement('img');
    img.src = preview;
    img.width = 100;
    document.body?.appendChild(img);
  });

  uppy.on('file-removed', () => {});

  uppy.on('complete', () => {
    console.log('complete');
  });

  // Finish selecting files
  const onSelectFiles = () => {};

  return <Begin uppy={uppy} onSelectFiles={onSelectFiles} />;
}
