import { Stack } from '@chakra-ui/react'
import { graphql, useFragment, useMutation } from 'react-relay/hooks'
import type {
  ArrangeUploadsFragment$data,
  ArrangeUploadsFragment$key
} from '@//:artifacts/ArrangeUploadsFragment.graphql'
import DraggableContent from './DraggableContent/DraggableContent'
import { useEffect, useState } from 'react'
import { useSequenceContext } from '@//:modules/content/HookedComponents/Sequence'
import ArrangeButton from './ArrangeButton/ArrangeButton'
import { useToast } from '@//:modules/content/ThemeComponents'
import { t } from '@lingui/macro'
import { useUpdateEffect } from 'usehooks-ts'
import { useUppyContext } from '@//:modules/content/HookedComponents/Upload'

interface Props {
  query: ArrangeUploadsFragment$key
}

const ArrangeUploadsFragmentGQL = graphql`
  fragment ArrangeUploadsFragment on Post {
    id
    club {
      canCreateSupporterOnlyPosts
    }
    content {
      id
      isSupporterOnly
      resource {
        id
        urls {
          url
        }
      }
      ...DraggableContentFragment
    }
    ...ArrangeButtonFragment
  }
`

const reorder = (
  list: ArrangeUploadsFragment$data['content'],
  startIndex: number,
  endIndex: number
): ArrangeUploadsFragment$data['content'] => {
  const result = Array.from(list)
  const [removed] = result.splice(startIndex, 1)
  result.splice(endIndex, 0, removed)

  return result
}

export default function ArrangeUploads ({
  query
}: Props): JSX.Element {
  const data = useFragment(ArrangeUploadsFragmentGQL, query)

  const {
    state,
    dispatch
  } = useSequenceContext()

  const [displayData, setDisplayData] = useState(data.content)

  const notify = useToast()

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

  useEffect(() => {
    const ids = displayData.map((item) => item.id)

    dispatch({
      type: 'content',
      value: ids,
      transform: 'SET'
    })
  }, [displayData])

  useUpdateEffect(() => {
    if (state.isRearranging === false) {
      setDisplayData(data.content)
    }
  }, [data.content, state.isRearranging])

  if (displayData.length < 1) {
    return (
      <></>
    )
  }

  return (
    <Stack spacing={2}>
      <ArrangeButton query={data} />
      <Stack
        spacing={2}
      >
        {displayData.map((item, index) => (
          <DraggableContent
            canSupport={data.club.canCreateSupporterOnlyPosts}
            onDragEnd={onDragEnd}
            dragDisabled={!(state.isRearranging as boolean)}
            isSupportingContent={isSupportingContent}
            key={index}
            index={index}
            total={data.content.length}
            query={item}
            onRemove={onRemoveContent}
            onSupport={onSupporterContent}
            h={getHeight()}
          />
        ))}
      </Stack>
    </Stack>
  )
}
