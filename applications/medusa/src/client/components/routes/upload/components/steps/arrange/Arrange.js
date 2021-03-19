/**
 * @flow
 */
import type { Node } from 'react';
import Picker from '../../picker/Picker';
import { events } from '../../../Upload';
import { DragDropContext, Droppable } from 'react-beautiful-dnd';
import File from './file/File';

type Props = {
  uppy: any,
  onAddFiles: any,
  dispatch: any,
  state: any,
};

// a little function to help us with reordering the result
const reorder = (list, startIndex, endIndex) => {
  const result = Array.from(list);
  const [removed] = result.splice(startIndex, 1);
  result.splice(endIndex, 0, removed);

  return result;
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

  const onDragEnd = result => {
    // dropped outside the list
    if (!result.destination) {
      return;
    }

    const files = reorder(
      state.files,
      result.source.index,
      result.destination.index,
    );

    dispatch({ type: events.FILES, value: files });
  };

  return (
    <>
      files so far
      <DragDropContext onDragEnd={onDragEnd}>
        <Droppable droppableId="upload">
          {(provided, snapshot) => (
            <div
              {...provided.droppableProps}
              ref={provided.innerRef}
              sx={{
                backgroundColor: snapshot.isDraggingOver ? 'green' : null,
              }}
            >
              {state.files.map((file, index) => (
                <File
                  key={file.id}
                  file={file}
                  thumbnail={state.thumbnails[file.id]}
                  progress={state.progress[file.id]}
                  onRemove={onRemoveFile}
                  index={index}
                />
              ))}
            </div>
          )}
        </Droppable>
      </DragDropContext>
      <div />
      add more files
      <Picker uppy={uppy} onSelect={onAddFiles} />
    </>
  );
}
