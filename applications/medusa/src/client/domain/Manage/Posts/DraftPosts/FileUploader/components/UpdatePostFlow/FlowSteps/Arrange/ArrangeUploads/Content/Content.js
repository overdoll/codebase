/**
 * @flow
 */
import type { Node } from 'react'
import { useState, useEffect } from 'react'
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
import { graphql, useFragment } from 'react-relay/hooks'

type Props = {
  content: Array<ContentType>,
  onRemove: () => void,
  index: number
};

export default function Content ({ content, onRemove, index }: Props): Node {
  return (
    <Draggable draggableId={content.id} key={content.id} index={index}>
      {(provided, snapshot) => (
        <Flex
          h={130}
          direction='column'
          bg='gray.800'
          borderRadius='md'
          borderWidth={2}
          borderColor={snapshot.isDragging ? 'primary.500' : 'gray.900'}
          ref={provided.innerRef}
          {...provided.draggableProps}
          {...provided.dragHandleProps}
        >
          <Box>
            {content.id}
          </Box>
          <CloseButton onClick={() => onRemove(content.id)} />
        </Flex>
      )}
    </Draggable>
  )
}
