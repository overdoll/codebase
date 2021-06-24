/**
 * @flow
 */
import type { Node } from 'react'
import { Draggable } from 'react-beautiful-dnd'
import { Flex, Heading, Text, Skeleton, CloseButton } from '@chakra-ui/react'
import Thumbnail from '../thumbnail/Thumbnail'
import Icon from '@//:modules/content/icon/Icon'

import InterfacePageControllerScrollUp
  from '@streamlinehq/streamlinehq/img/streamline-mini-bold/interface-essential/page-controller/interface-page-controller-scroll-up.svg'
import InterfaceArrowsButtonDown
  from '@streamlinehq/streamlinehq/img/streamline-mini-bold/interface-essential/arrows/interface-arrows-button-down.svg'

type Props = {
  file: any,
  thumbnail: ?string,
  progress: {
    0: number,
    1: number
  },
  onRemove: () => void,
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
        <Flex
          direction='row'
          h={130}
          bg='gray.800'
          borderRadius={5}
          borderWidth={2}
          overflow='hidden'
          objectFit='cover'
          borderColor={snapshot.isDragging ? 'red.500' : 'gray.900'}
          userSelect='none'
          ref={provided.innerRef}
          {...provided.draggableProps}
          {...provided.dragHandleProps}
        >
          <Flex w='8%' justifyContent='center' direction='column' alignItems='center'>
            <Icon mb={3} icon={InterfacePageControllerScrollUp} fill='gray.600' h={5} w={5} />
            <Heading fontSize='lg' color='gray.100'>
              {index + 1}
            </Heading>
            <Icon mt={3} icon={InterfaceArrowsButtonDown} fill='gray.600' h={5} w={5} />
          </Flex>
          <Flex w='52%'>
            <Thumbnail type={file.type.split('/')[0]} thumbnail={thumbnail} progress={progress} />
          </Flex>
          <Flex w='40%' direction='column'>
            <Flex justifyContent='flex-end'>
              <CloseButton size='md' onClick={() => onRemove(file.id)} />
            </Flex>
            <Flex alignItems='center' position='relative' ml={2} mr={2}>
              <Heading isTruncated fontSize='lg' color='gray.100'>
                {file.id.slice(5).split('/')[0]}
              </Heading>
            </Flex>
            <Flex position='relative' ml={2} mr={2}>
              <Text fontSize='sm' color='gray.100' isTruncated>
                {file.type.replace('/', ' - ')}
              </Text>
            </Flex>
            <Flex position='relative' ml={2} mr={2}>
              {progress
                ? (
                  <Text fontSize='sm' color='gray.100' isTruncated>
                    {(progress['1'] / 1000000).toFixed(2)} mb
                  </Text>
                  )
                : (
                  <Skeleton />
                  )}
            </Flex>

          </Flex>
        </Flex>
      )}
    </Draggable>
  )
}
