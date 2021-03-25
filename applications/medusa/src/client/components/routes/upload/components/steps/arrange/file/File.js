/**
 * @flow
 */
import type {Node} from 'react';
import {Draggable} from 'react-beautiful-dnd';

type Props = {
    file: any,
    thumbnail: ?string,
    progress: any,
    onRemove: any,
    index: number,
};

export default function File({
                                 file,
                                 thumbnail,
                                 progress,
                                 onRemove,
                                 index,
                             }: Props): Node {
    const displayImage = thumb => {
        return (
            <img alt="thumbnail" src={thumb} sx={{
                display: 'inline',
                borderRadius: 5,
                backgroundColor: 'neutral.800',
                height: '300px',
                width: 'inherit'
            }}/>
        )
    }

    return (
        <Draggable draggableId={file.id} index={index}>
            {(provided, snapshot) => (
                <div
                    sx={{
                        borderColor: 'green.300',
                        borderWidth: snapshot.isDragging ? 2 : 0,
                        borderStyle: 'solid',
                        width: 'fill',
                    }}
                    ref={provided.innerRef}
                    {...provided.draggableProps}
                    {...provided.dragHandleProps}
                >
                    {thumbnail ? displayImage(thumbnail) : 'no thumb'}
                    <div sx={{display: 'inline-block', position: 'absolute'}}>
                        {progress ? `${progress['0']}/${progress['1']}` : 'waiting'}
                    </div>
                    <div sx={{display: 'inline-block', position: 'absolute', transform: 'translateX(-100%)'}}>
                        <button onClick={() => onRemove(file.id)}>x</button>
                    </div>
                </div>
            )}
        </Draggable>

    )
        ;
}
