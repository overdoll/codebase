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
  CloseButton, Spacer, Stack,
  Center
} from '@chakra-ui/react'
import { useTranslation } from 'react-i18next'
import type { Uppy } from '@uppy/core'
import Button from '@//:modules/form/Button'
import { graphql, useFragment } from 'react-relay/hooks'
import type { ArrangeUploadsFragment$key } from '@//:artifacts/ArrangeUploadsFragment.graphql'
import { EVENTS, INITIAL_STATE, STEPS } from '../../../../../../constants/constants'
import { DragDropContext, Droppable } from 'react-beautiful-dnd'
import Content from './Content/Content'
import { SmallBackgroundBox } from '@//:modules/content/PageLayout'

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

  const [t] = useTranslation('manage')

  const displayData = state.content || data.content

  const dragDisabled = (state.files.length !== (Object.keys(state.urls)).length) || (state.files.length > 0)

  const onRemoveFile = id => {
    uppy.removeFile(id)
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

  if (displayData.length < 1) {
    return (
      <SmallBackgroundBox display='flex' h={100}>
        <Flex align='center' justify='center'>
          <Text>{t('create_post.flow.steps.arrange.arranger.empty')}</Text>
        </Flex>
      </SmallBackgroundBox>
    )
  }

  return (
    <DragDropContext onDragEnd={onDragEnd}>
      <Droppable droppableId='upload'>
        {(provided, snapshot) => (
          <Stack
            spacing={2}
            {...provided.droppableProps}
            ref={provided.innerRef}
          >
            {displayData.map((item, index) => (
              <Content dragDisabled={dragDisabled} key={index} content={item} index={index} onRemove={onRemoveFile} />
            ))}
            {provided.placeholder}
          </Stack>
        )}
      </Droppable>
    </DragDropContext>
  )
}
