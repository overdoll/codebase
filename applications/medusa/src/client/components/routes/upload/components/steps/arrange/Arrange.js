/**
 * @flow
 */
import type { Node } from 'react'
import Picker from '../../picker/Picker'
import { DragDropContext, Droppable } from 'react-beautiful-dnd'
import File from './file/File'
import type { Dispatch, State } from '@//:types/upload'
import { EVENTS } from '../../../constants/constants'
import type { Uppy } from '@uppy/core'

type Props = {
  uppy: Uppy,
  onAddFiles: () => void,
  dispatch: Dispatch,
  state: State,
};

// a little function to help us with reordering the result
const reorder = (
  list: Array<string>,
  startIndex: number,
  endIndex: number
): Array<string> => {
  const result = Array.from(list)
  const [removed] = result.splice(startIndex, 1)
  result.splice(endIndex, 0, removed)

  return result
}

export default function Arrange ({
  uppy,
  onAddFiles,
  state,
  dispatch
}: Props): Node {
  // OnRemoveFile - remove a file from the list
  const onRemoveFile = id => {
    uppy.removeFile(id)

    dispatch({ type: EVENTS.FILES, value: { id: id }, remove: true })

    if (state.files.length === 1) {
      // if last file, then we cleanup
      uppy.reset()
      dispatch({ type: EVENTS.STEP, value: null })
    } else {
      // if not the last file, clean up the state
      dispatch({
        type: EVENTS.PROGRESS,
        value: { [id]: state.progress[id] },
        remove: true
      })

      dispatch({
        type: EVENTS.THUMBNAILS,
        value: { [id]: state.thumbnails[id] },
        remove: true
      })

      dispatch({
        type: EVENTS.URLS,
        value: { [id]: state.urls[id] },
        remove: true
      })
    }
  }

  const onDragEnd = result => {
    // dropped outside the list
    if (!result.destination) {
      return
    }

    const files = reorder(
      state.files,
      result.source.index,
      result.destination.index
    )

    dispatch({ type: EVENTS.ARRANGE_FILES, value: files })
  }

  return (
    <>
      files so far
      <DragDropContext nonce={window.__webpack_nonce__} onDragEnd={onDragEnd}>
        <Droppable droppableId='upload'>
          {(provided, snapshot) => (
            <div
              {...provided.droppableProps}
              ref={provided.innerRef}
              sx={{
                backgroundColor: snapshot.isDraggingOver ? 'green' : null
              }}
            >
              {provided.placeholder}
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
  )
}
