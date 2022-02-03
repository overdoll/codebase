import { useToast } from '@chakra-ui/react'
import { graphql, useMutation } from 'react-relay/hooks'
import { useFragment } from 'react-relay'
import type { UpdateContentButtonFragment$key } from '@//:artifacts/UpdateContentButtonFragment.graphql'
import type { UpdateContentButtonMutation } from '@//:artifacts/UpdateContentButtonMutation.graphql'
import { compareTwoArrayOrders } from '@//:modules/support'
import { t } from '@lingui/macro'
import { useContext } from 'react'
import { FlowBuilderNextButton, FlowBuilderSaveButton } from '@//:modules/content/PageLayout'
import { DispatchContext, StateContext } from '@//:modules/hooks/useReducerBuilder/context'

interface Props {
  query: UpdateContentButtonFragment$key
  nextStep: () => void
}

const Fragment = graphql`
  fragment UpdateContentButtonFragment on Post {
    id
    content {
      id
      urls {
        url
      }
    }
  }
`

const Mutation = graphql`
  mutation UpdateContentButtonMutation ($input: UpdatePostContentOrderInput!) {
    updatePostContentOrder(input: $input) {
      post {
        id
        content {
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
`

export default function UpdateContentButton ({
  query,
  nextStep
}: Props): JSX.Element {
  const state = useContext(StateContext)
  const dispatch = useContext(DispatchContext)
  const data = useFragment(Fragment, query)

  const [updateContent, isUpdatingContent] = useMutation<UpdateContentButtonMutation>(Mutation)

  const notify = useToast()

  const buttonDisabled = (): boolean => {
    if ((state.uploads.files.length !== (Object.keys(state.uploads.urls)).length) || (state.uploads.files.length > 0)) {
      return true
    } else if (state.content.value.length < 1) {
      return true
    }
    return false
  }

  const hasUpdate = (): boolean => {
    const currentContent = data.content.map((item) => item.id)
    // We only check the order because newly added files are committed automatically
    if (state.content.value === []) return false
    return !compareTwoArrayOrders(currentContent, state.content.value)
  }

  const onUpdateContent = (): void => {
    updateContent({
      variables: {
        input: {
          id: data.id,
          contentIds: state.content.value
        }
      },
      onCompleted () {
        dispatch({
          type: 'content',
          value: []
        })
        nextStep()
      },
      onError () {
        notify({
          status: 'error',
          title: t`There was an error updating the post content`,
          isClosable: true
        })
      }
    })
  }

  if (hasUpdate()) {
    return (
      <FlowBuilderSaveButton
        isDisabled={buttonDisabled()}
        isLoading={isUpdatingContent}
        onClick={onUpdateContent}
      />
    )
  }

  return (
    <FlowBuilderNextButton
      isDisabled={buttonDisabled()}
    />
  )
}
