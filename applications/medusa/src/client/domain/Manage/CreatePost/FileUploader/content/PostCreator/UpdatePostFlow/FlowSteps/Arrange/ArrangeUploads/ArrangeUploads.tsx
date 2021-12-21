import type { Content as ContentType, Dispatch, State } from '@//:types/upload'
import { Flex, Stack, Text } from '@chakra-ui/react'
import { useTranslation } from 'react-i18next'
import type { Uppy } from '@uppy/core'
import { graphql, useFragment } from 'react-relay/hooks'
import type { ArrangeUploadsFragment$key } from '@//:artifacts/ArrangeUploadsFragment.graphql'
import { EVENTS } from '../../../../../../constants/constants'
import { DragDropContext, Droppable } from 'react-beautiful-dnd'
import DraggableContent from './Content/DraggableContent'
import { SmallBackgroundBox } from '@//:modules/content/PageLayout'

interface Props {
  uppy: Uppy
  state: State
  dispatch: Dispatch
  query: ArrangeUploadsFragment$key
}

const ArrangeUploadsFragmentGQL = graphql`
  fragment ArrangeUploadsFragment on Post {
    content {
      urls {
        url
        mimeType
      }
      ...DraggableContentFragment
    }
  }
`

const reorder = (
  list: ContentType[],
  startIndex: number,
  endIndex: number
): ContentType[] => {
  const result = Array.from(list)
  const [removed] = result.splice(startIndex, 1)
  result.splice(endIndex, 0, removed)

  return result
}

// TODO redo dragging system
// on rearrange, add URLS to content in the rearranged order
// content is now string[]
// need some sort of state here to keep the arrange order.
// or the state is mounted automatically and then a filter lookup is done
// to find the correct fragment
// and then the current URLS are compared to the old URLs

export default function ArrangeUploads ({
  state,
  uppy,
  dispatch,
  query
}: Props): JSX.Element {
  const data = useFragment(ArrangeUploadsFragmentGQL, query)

  const [t] = useTranslation('manage')

  const displayData = state.content ?? data.content

  const dragDisabled = (state.files.length !== (Object.keys(state.urls)).length) || (state.files.length > 0)

  const onRemoveFile = (id: string): void => {
    uppy.removeFile(id)
    if (state.content != null) {
      dispatch({
        type: EVENTS.CONTENT,
        value: id,
        remove: true
      })
    }
    dispatch({
      type: EVENTS.CONTENT,
      value: displayData
    })
    dispatch({
      type: EVENTS.CONTENT,
      value: id,
      remove: true
    })
  }

  const onDragEnd = (result): void => {
    // dropped outside the list
    if (result?.destination == null) {
      return
    }

    const content = reorder(
      displayData,
      result.source.index,
      result.destination.index
    )

    dispatch({
      type: EVENTS.CONTENT,
      value: content
    })
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
              <DraggableContent
                dragDisabled={dragDisabled}
                key={index}
                index={index}
                query={item}
                onRemove={onRemoveFile}
              />
            ))}
            {provided.placeholder}
          </Stack>
        )}
      </Droppable>
    </DragDropContext>
  )
}
