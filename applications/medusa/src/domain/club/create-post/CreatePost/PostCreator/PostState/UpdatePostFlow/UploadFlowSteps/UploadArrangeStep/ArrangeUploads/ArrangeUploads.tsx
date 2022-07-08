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

const ArrangeUploadsMutationGQL = graphql`
  mutation ArrangeUploadsMutation($input: RemovePostContentInput!) {
    removePostContent(input: $input) {
      post {
        id
        reference
        content {
          resource {
            id
            type
            processed
            urls {
              url
              mimeType
            }
          }
        }
      }
    }
  }
`

const SupporterUploadsMutationGQL = graphql`
  mutation ArrangeUploadsSupporterMutation($input: UpdatePostContentIsSupporterOnlyInput!) {
    updatePostContentIsSupporterOnly(input: $input) {
      post {
        id
        reference
        content {
          viewerCanViewSupporterOnlyContent
          isSupporterOnly
          resource {
            id
          }
        }
      }
    }
  }
`

// TODO find an alternative to the draggable library and replace as it doesn't support react 18

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

  const [removeContent, isRemovingContent] = useMutation(ArrangeUploadsMutationGQL)
  const [supporterContent, isSupportingContent] = useMutation(SupporterUploadsMutationGQL)

  const uppy = useUppyContext()
  const {
    state,
    dispatch
  } = useSequenceContext()

  const [displayData, setDisplayData] = useState(data.content)

  const notify = useToast()

  const onRemoveContent = (id: string): void => {
    removeContent({
      variables: {
        input: {
          id: data.id,
          contentIds: [id]
        }
      },
      onCompleted () {
        uppy.removeFile(id)
      },
      onError () {
        notify({
          status: 'error',
          title: t`Error removing content ${id}`
        })
      }
    })
  }

  const onSupporterContent = (id: string, isSupporterOnly: boolean): void => {
    supporterContent({
      variables: {
        input: {
          id: data.id,
          contentIds: [id],
          isSupporterOnly: isSupporterOnly
        }
      },
      onError () {
        notify({
          status: 'error',
          title: t`Error marking content ${id} as supporter only`
        })
      }
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
      <ArrangeButton isDisabled={isRemovingContent || isSupportingContent} query={data} />
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
