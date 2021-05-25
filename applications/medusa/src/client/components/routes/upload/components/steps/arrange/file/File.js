/**
 * @flow
 */
import type { Node } from 'react'
import { Draggable } from 'react-beautiful-dnd'
import type { UppyFile } from '@uppy/core'

type Props = {
  file: UppyFile,
  thumbnail: ?string,
  progress: {},
  onRemove: (string) => void,
  index: number,
};

export default function File ({
  file,
  thumbnail,
  progress,
  onRemove,
  index
}: Props): Node {
  return (
    <Draggable draggableId={file.id} index={index}>
      {(provided, snapshot) => (
        <div
          sx={{
            backgroundColor: snapshot.isDragging ? 'green' : null
          }}
          ref={provided.innerRef}
          {...provided.draggableProps}
          {...provided.dragHandleProps}
        >
          {thumbnail ? <img alt='thumbnail' src={thumbnail} /> : 'no thumb'}
          <button onClick={() => onRemove(file.id)}>x</button>
          {progress ? `${progress['0']}/${progress['1']}` : 'waiting'}
        </div>
      )}
    </Draggable>
  )
}
