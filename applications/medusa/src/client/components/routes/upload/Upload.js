/**
 * @flow
 */
import type { Node } from 'react';
import { useState } from 'react';
import { useUppy } from '@uppy/react';
import Uppy from './components/uppy/Uppy';
import Begin from './components/steps/begin/Begin';
import Arrange from './components/steps/arrange/Arrange';
import { useNotify } from '@//:modules/focus';

type Props = {};

export default function Upload(props: Props): Node {
  const uppy = useUppy(() => {
    return Uppy;
  });

  const notify = useNotify();

  const [step, setStep] = useState(null);
  const [files, setFiles] = useState([]);

  uppy.on('thumbnail:generated', (file, preview) => {
    const img = document.createElement('img');
    img.src = preview;
    img.width = 100;
    document.body?.appendChild(img);
  });

  uppy.on('upload-error', data => {
    console.log('error');
  });

  uppy.on('upload-progress', (file, progress) => {
    // file: { id, name, type, ... }
    // progress: { uploader, bytesUploaded, bytesTotal }
    console.log(file.id, progress.bytesUploaded, progress.bytesTotal);
  });

  uppy.on('restriction-failed', (file, error) => {
    // do some customized logic like showing system notice to users
  });

  uppy.on('upload', data => {
    if (step === null) {
      setStep('arrange');
    }
    console.log('upload');
  });

  uppy.on('file-removed', () => {});

  uppy.on('complete', () => {
    console.log('complete');
  });

  uppy.on('upload-success', (file, response) => {
    console.log(file.name, response.uploadURL);
  });

  uppy.on('info-visible', () => {
    const info = uppy.getState().info;

    const message = `${info.message} ${info.details}`;

    switch (info.type) {
      case 'error':
        notify.error(message);
        break;
      default:
        notify.warn(`${info.message} ${info.details}`);
        break;
    }
  });

  // Add files
  const onAddFiles = files => {};

  const onRemoveFile = file => {};

  const onArrangeFile = (file, pos) => {};

  switch (step) {
    case 'arrange':
      return (
        <Arrange
          uppy={uppy}
          onAddFiles={onAddFiles}
          onRemoveFile={onRemoveFile}
          files={files}
          onArrangeFile={onArrangeFile}
        />
      );
    default:
      return <Begin uppy={uppy} onAddFiles={onAddFiles} />;
  }
}
