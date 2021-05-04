/**
 * @flow
 */
import type { Node } from 'react';
import { Draggable } from 'react-beautiful-dnd';
import { Flex, Heading, Text, Skeleton, CloseButton } from '@chakra-ui/react';
import Close from '@streamlinehq/streamlinehq/img/streamline-bold/close-sjsGBB.svg';
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
        <Flex
          direction="row"
          h={130}
          bg="gray.800"
          borderRadius={5}
          borderWidth={2}
          overflow="hidden"
          objectFit="cover"
          borderColor={snapshot.isDragging ? 'teal.500' : 'gray.900'}
          ref={provided.innerRef}
          {...provided.draggableProps}
          {...provided.dragHandleProps}
        >
          <Flex w="8%" justifyContent="center" alignItems="center">
            <Heading fontSize="lg" color="gray.100">
              {index + 1}
            </Heading>
          </Flex>
          <Flex w="52%">
            <Thumbnail thumbnail={thumbnail} progress={progress} />
          </Flex>
          <Flex w="40%" direction="column">
            <Flex justifyContent="flex-end">
              <CloseButton size="md" onClick={() => onRemove(file.id)} />
            </Flex>
            <Flex alignItems="center" position="relative" ml={2} mr={2}>
              <Heading isTruncated fontSize="lg" color="gray.100">
                {file.id.slice(5)}
              </Heading>
            </Flex>
            <Flex position="relative" alignItems="center" ml={2} mr={2}>
              <Text color="neutral.100">mp4</Text>
            </Flex>
            <Flex position="relative" ml={2} mr={2}>
              <Text fontSize="sm" color="gray.100" isTruncated>
                {progress ? (
                  `${(progress['1'] / 1000000).toFixed(2)} mb`
                ) : (
                  <Skeleton />
                )}
              </Text>
            </Flex>
          </Flex>
        </Flex>
      )}
    </Draggable>
  );
}
