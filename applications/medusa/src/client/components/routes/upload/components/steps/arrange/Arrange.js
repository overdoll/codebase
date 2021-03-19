/**
 * @flow
 */
import type { Node } from 'react';
import Picker from '../../picker/Picker';
import { events } from '../../../Upload';
import { DragDropContext, Draggable, Droppable } from 'react-beautiful-dnd';

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

  // TODO: split this up into more components
  return (
    <>
      files so far
      <DragDropContext onDragEnd={onDragEnd}>
        <Droppable droppableId="droppable">
          {(provided, snapshot) => (
            <div
              {...provided.droppableProps}
              ref={provided.innerRef}
              sx={{
                backgroundColor: snapshot.isDraggingOver ? 'green' : null,
              }}
            >
              {state.files.map((file, index) => {
                const thumbnail = state.thumbnails[file.id];
                const prog = state.progress[file.id];

                return (
                  <Draggable key={file.id} draggableId={file.id} index={index}>
                    {(provided, snapshot) => (
                      <div
                        sx={{
                          backgroundColor: snapshot.isDragging ? 'green' : null,
                        }}
                        ref={provided.innerRef}
                        {...provided.draggableProps}
                        {...provided.dragHandleProps}
                      >
                        {thumbnail ? (
                          <img alt="thumbnail" src={thumbnail} />
                        ) : (
                          'no thumb'
                        )}
                        <button onClick={() => onRemoveFile(file.id)}>x</button>
                        {prog ? `${prog['0']}/${prog['1']}` : 'waiting'}
                      </div>
                    )}
                  </Draggable>
                );
              })}
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
