/**
 * @flow
 */
import type { Node } from 'react';
import Picker from '../../picker/Picker';
import { events } from '../../../Upload';

type Props = {
  uppy: any,
  onAddFiles: any,
  dispatch: any,
  state: any,
};

export default function Arrange({
  uppy,
  onAddFiles,
  state,
  dispatch,
}: Props): Node {
  // OnRemoveFile - remove a file from the list
  const onRemoveFile = id => {
    uppy.removeFile(id);

    if (uppy.getFiles().length === 0) {
      dispatch({ type: events.STEP, value: null });
    }

    dispatch({ type: events.FILES, value: uppy.getFiles() });

    // Remove progress & thumbnail & urls from object
    const newProgress = { ...state.progress };
    delete newProgress[id];
    dispatch({
      type: events.PROGRESS,
      value: newProgress,
    });

    const newThumbnails = { ...state.thumbnails };
    delete newThumbnails[id];

    dispatch({
      type: events.THUMBNAILS,
      value: newThumbnails,
    });

    const newUrls = { ...state.urls };
    delete newUrls[id];

    dispatch({
      type: events.URLS,
      value: newUrls,
    });
  };

  // OnArrangeFile - arrange the file
  const onArrangeFile = (file, pos) => {};

  return (
    <>
      files so far
      {state.files.map(file => {
        const thumbnail = state.thumbnails[file.id];
        const prog = state.progress[file.id];

        return (
          <div key={file.id}>
            {thumbnail ? <img alt="thumbnail" src={thumbnail} /> : 'no thumb'}
            <button onClick={() => onRemoveFile(file.id)}>x</button>
            {prog ? `${prog['0']}/${prog['1']}` : 'waiting'}
          </div>
        );
      })}
      <div />
      add more files
      <Picker uppy={uppy} onSelect={onAddFiles} />
    </>
  );
}
