/**
 * @flow
 */
import type { Node } from 'react'
import type { Content as ContentType } from '../../../../../../../../../../../../types/upload'
import { CloseButton, Flex, Heading } from '@chakra-ui/react'
import { Draggable } from 'react-beautiful-dnd'
import ResourceItem from '@//:modules/content/DataDisplay/ResourceItem/ResourceItem'

type Props = {
  content: Array<ContentType>,
  onRemove: () => void,
  index: number,
  dragDisabled: boolean,
};

export default function Content ({ content, onRemove, index, dragDisabled }: Props): Node {
  return (
    <Draggable isDragDisabled={dragDisabled} draggableId={content.id} key={content.id} index={index}>
      {(provided, snapshot) => (
        <Flex
          h={100}
          bg='gray.800'
          borderRadius='md'
          overflow='hidden'
          boxShadow={snapshot.isDragging ? 'drag' : 'none'}
          ref={provided.innerRef}
          {...provided.draggableProps}
          {...provided.dragHandleProps}
        >
          <Flex align='center' w='12%' justify='center'>
            <Heading fontSize='lg'>
              {index + 1}
            </Heading>
          </Flex>
          <Flex align='center' justify='center' w='38%'>
            <ResourceItem type={content.type} urls={content.urls} />
          </Flex>
          <Flex w='38%' />
          <Flex align='center' bg='gray.700' w='12%' justify='flex-end'>
            <CloseButton m={2} isDisabled={dragDisabled} onClick={() => onRemove(content.id)} />
          </Flex>
        </Flex>
      )}
    </Draggable>
  )
}
