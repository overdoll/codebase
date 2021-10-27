/**
 * @flow
 */
import type { Node } from 'react'
import { useState, useEffect } from 'react'
import { getColor, mode } from '@chakra-ui/theme-tools'
import type { Content as ContentType } from '@//:types/upload'
import {
  Box,
  CircularProgress,
  CircularProgressLabel,
  Flex,
  Progress,
  Heading,
  Text,
  CloseButton, Spacer, Skeleton
} from '@chakra-ui/react'
import { Draggable } from 'react-beautiful-dnd'
import ContentItem from '../../../../../../../../../../../components/Posts/components/ContentItem/ContentItem'
import { graphql, useFragment } from 'react-relay/hooks'

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
          boxShadow={snapshot.isDragging ? '0 0 0 2px hsla(342,100%,58%,1)' : 'none'}
          ref={provided.innerRef}
          {...provided.draggableProps}
          {...provided.dragHandleProps}
        >
          <Box w='6%' />
          <Flex align='center' justify='center' w='40%'>
            <ContentItem content={content} />
          </Flex>
          <Flex w='54%' justify='flex-end' m={2}>
            <CloseButton isDisabled={dragDisabled} onClick={() => onRemove(content.id)} />
          </Flex>
        </Flex>
      )}
    </Draggable>
  )
}
