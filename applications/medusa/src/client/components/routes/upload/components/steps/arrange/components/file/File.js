/**
 * @flow
 */
import type { Node } from 'react';
import { Draggable } from 'react-beautiful-dnd';
import Heading from '@//:modules/typography/heading/Heading';
import Text from '@//:modules/typography/text/Text';
import Loading from '@//:modules/assets/loading/Loading';
import Delete from '@streamlinehq/streamline-bold/lib/interface-essential/Delete';
import Icon from '@//:modules/content/icon/Icon';
import Thumbnail from '../thumbnail/Thumbnail';

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
  return (
    <Draggable draggableId={file.id} index={index}>
      {(provided, snapshot) => (
        <div
          sx={{
            borderColor: snapshot.isDragging ? 'teal.500' : 'neutral.900',
            borderWidth: 2,
            borderStyle: 'solid',
            borderRadius: 5,
            backgroundColor: 'neutral.800',
            boxSizing: 'border-box',
            overflow: 'hidden',
            objectFit: 'cover',
            display: 'flex',
            height: '130px',
            alignContent: 'stretch',
          }}
          ref={provided.innerRef}
          {...provided.draggableProps}
          {...provided.dragHandleProps}
        >
          <div
            sx={{
              width: '10%',
              display: 'flex',
              flexDirection: 'column',
              position: 'relative',
              justifyContent: 'center',
              alignItems: 'center',
            }}
          >
            <Heading sx={{ mt: 3, mb: 3, color: 'neutral.100', fontSize: 2 }}>
              {index + 1}
            </Heading>
          </div>
          <Thumbnail
            thumbnail={thumbnail}
            progress={progress}
            sx={{
              width: '40%',
              display: 'flex',
              flexDirection: 'row',
              position: 'relative',
            }}
          />
          <div sx={{ display: 'flex', flexDirection: 'column', width: '50%' }}>
            <span
              sx={{
                position: 'relative',
                height: '20%',
                display: 'flex',
                justifyContent: 'flex-end',
                mt: 2,
                mr: 2,
              }}
            >
              <Icon
                icon={Delete.Delete2}
                strokeWidth={2.5}
                fill={'neutral.50'}
                size={20}
                onClick={() => onRemove(file.id)}
              />
            </span>
            <Heading
              sx={{
                position: 'relative',
                display: 'flex',
                fontSize: 2,
                overflow: 'hidden',
                height: '30%',
                whiteSpace: 'nowrap',
                alignItems: 'center',
                textOverflow: 'ellipsis',
                ml: 2,
                mr: 2,
              }}
            >
              {file.id.slice(5)}
            </Heading>
            <span
              sx={{
                position: 'relative',
                height: '20%',
                alignItems: 'center',
                display: 'flex',
                ml: 2,
                mr: 2,
              }}
            >
              <Text sx={{ color: 'neutral.100' }}>mp4</Text>
            </span>
            <span
              sx={{
                position: 'relative',
                height: '20%',
                alignItems: 'center',
                display: 'flex',
                ml: 2,
                mr: 2,
              }}
            >
              <Text sx={{ color: 'neutral.100' }}>
                {progress ? (
                  `${(progress['1'] / 1000000).toFixed(2)} mb`
                ) : (
                  <Loading />
                )}
              </Text>
            </span>
          </div>
        </div>
      )}
    </Draggable>
  );
}
