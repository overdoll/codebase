import type { Dispatch, State } from '@//:types/upload'
import { Flex, Stack, Text } from '@chakra-ui/react'
import type { Uppy } from '@uppy/core'
import { graphql, useFragment } from 'react-relay/hooks'
import type { ArrangeUploadsFragment, ArrangeUploadsFragment$key } from '@//:artifacts/ArrangeUploadsFragment.graphql'
import { EVENTS } from '../../../../../../constants/constants'
import { DragDropContext, Droppable } from 'react-beautiful-dnd'
import DraggableContent from './DraggableContent/DraggableContent'
import { SmallBackgroundBox } from '@//:modules/content/PageLayout'
import { useEffect, useState } from 'react'
import { Trans } from '@lingui/macro'

interface Props {
  uppy: Uppy
  state: State
  dispatch: Dispatch
  query: ArrangeUploadsFragment$key
}

const ArrangeUploadsFragmentGQL = graphql`
  fragment ArrangeUploadsFragment on Post {
    content {
      id
      urls {
        url
      }
      ...DraggableContentFragment
    }
  }
`

const reorder = (
  list: ArrangeUploadsFragment['content'],
  startIndex: number,
  endIndex: number
): ArrangeUploadsFragment['content'] => {
  const result = Array.from(list)
  const [removed] = result.splice(startIndex, 1)
  result.splice(endIndex, 0, removed)

  return result
}

export default function ArrangeUploads ({
  state,
  uppy,
  dispatch,
  query
}: Props): JSX.Element {
  const data = useFragment(ArrangeUploadsFragmentGQL, query)

  const [displayData, setDisplayData] = useState(data.content)

  const dragDisabled = (state.files.length !== (Object.keys(state.urls)).length) || (state.files.length > 0)

  const onRemoveFile = (id: string): void => {
    uppy.removeFile(id)

    const filteredData = displayData.filter((item) => item.id !== id)

    setDisplayData(filteredData)
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

    setDisplayData(content)
  }

  const getHeight = (): number => {
    if (displayData.length <= 1) {
      return 150
    } else if (displayData.length < 6) {
      return 100
    } else {
      return 75
    }
  }

  useEffect(() => {
    const urls = displayData.map((item) => item.urls[0].url)

    dispatch({
      type: EVENTS.CONTENT,
      value: urls
    })
  }, [displayData])

  useEffect(() => {
    setDisplayData(data.content)
  }, [data.content])

  if (displayData.length < 1) {
    return (
      <SmallBackgroundBox display='flex' h={100}>
        <Flex align='center' justify='center'>
          <Text>
            <Trans>
              You'll need to upload at least one file to continue
            </Trans>
          </Text>
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
                dragDisabled={dragDisabled || displayData.length < 2}
                removeDisabled={displayData.length < 2}
                key={index}
                index={index}
                query={item}
                onRemove={onRemoveFile}
                h={getHeight()}
              />
            ))}
            {provided.placeholder}
          </Stack>
        )}
      </Droppable>
    </DragDropContext>
  )
}
