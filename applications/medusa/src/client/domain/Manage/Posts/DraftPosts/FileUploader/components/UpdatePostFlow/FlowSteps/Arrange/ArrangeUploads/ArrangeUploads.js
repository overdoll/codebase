/**
 * @flow
 */
import type { Node } from 'react'
import { useState, useEffect } from 'react'
import type { Dispatch, State } from '@//:types/upload'
import {
  Box,
  CircularProgress,
  CircularProgressLabel,
  Flex,
  Progress,
  Heading,
  Text,
  CloseButton, Spacer, Stack
} from '@chakra-ui/react'
import { useTranslation } from 'react-i18next'
import type { Uppy } from '@uppy/core'
import Button from '@//:modules/form/Button'
import { graphql, useFragment } from 'react-relay/hooks'
import type { ArrangeUploadsFragment$key } from '@//:artifacts/ArrangeUploadsFragment.graphql'
import { EVENTS, INITIAL_STATE, STEPS } from '../../../../../constants/constants'
import { DragDropContext, Droppable } from 'react-beautiful-dnd'
import Content from './Content/Content'

type Props = {
  uppy: Uppy,
  state: State,
  dispatch: Dispatch,
  query: ArrangeUploadsFragment$key
}

const ArrangeUploadsFragmentGQL = graphql`
  fragment ArrangeUploadsFragment on Post {
    content {
      id
      type
      urls {
        url
        mimeType
      }
    }
  }
`

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

export default function ArrangeUploads ({ state, uppy, dispatch, query }: Props): Node {
  const data = useFragment(ArrangeUploadsFragmentGQL, query)

  const displayData = state.content || data.content

  const onRemoveFile = id => {
    if (state.content) {
      dispatch({
        type: EVENTS.CONTENT,
        value: id,
        remove: true
      })
    }

    dispatch({ type: EVENTS.CONTENT, value: displayData })
    dispatch({
      type: EVENTS.CONTENT,
      value: id,
      remove: true
    })
  }

  const onDragEnd = result => {
    // dropped outside the list
    if (!result.destination) {
      return
    }

    const content = reorder(
      displayData,
      result.source.index,
      result.destination.index
    )

    dispatch({ type: EVENTS.CONTENT, value: content })
  }

  return (
    <DragDropContext onDragEnd={onDragEnd}>
      <Droppable droppableId='upload'>
        {(provided, snapshot) => (
          <Stack
            spacing={1}
            {...provided.droppableProps}
            ref={provided.innerRef}
          >
            {displayData.map((item, index) => (
              <Content key={index} content={item} index={index} onRemove={onRemoveFile} />
            ))}
            {provided.placeholder}
          </Stack>
        )}
      </Droppable>
    </DragDropContext>
  )
}
