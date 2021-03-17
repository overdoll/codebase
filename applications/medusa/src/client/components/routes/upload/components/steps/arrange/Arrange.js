/**
 * @flow
 */
import type { Node } from 'react';
import Picker from '../../picker/Picker';

type Props = {
  uppy: any,
  onAddFiles: any,
  onRemoveFile: any,
  files: any,
  onArrangeFile: any,
  thumbnails: any,
  progress: any,
};

export default function Arrange({
  uppy,
  onAddFiles,
  onRemoveFile,
  onArrangeFile,
  files,
  thumbnails,
  progress,
}: Props): Node {
  console.log(progress);
  return (
    <>
      files so far
      {files.map(file => {
        const thumbnail = thumbnails[file.id];

        return (
          <div key={file.id}>
            {thumbnail ? <img alt="thumbnail" src={thumbnail} /> : 'no thumb'}
            <button onClick={() => onRemoveFile(file.id)}>x</button>
          </div>
        );
      })}
      <div />
      add more files
      <Picker uppy={uppy} onSelect={onAddFiles} />
    </>
  );
}
