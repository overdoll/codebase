import { graphql, useMutation } from 'react-relay/hooks'
import { useFragment } from 'react-relay'
import type { UpdateContentButtonFragment$key } from '@//:artifacts/UpdateContentButtonFragment.graphql'
import type { UpdateContentButtonMutation } from '@//:artifacts/UpdateContentButtonMutation.graphql'
import { compareTwoArrayOrders } from '@//:modules/support'
import { t } from '@lingui/macro'
import { FlowBuilderNextButton, FlowBuilderSaveButton } from '@//:modules/content/PageLayout'
import { useToast } from '@//:modules/content/ThemeComponents'
import { useSequenceContext } from '@//:modules/content/HookedComponents/Sequence'

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
  const data = useFragment(Fragment, query)

  const {
    state,
    dispatch
  } = useSequenceContext()

  const [updateContent, isUpdatingContent] = useMutation<UpdateContentButtonMutation>(Mutation)

  const notify = useToast()

  const buttonDisabled = (): boolean => {
    if ((state.files.length !== (Object.keys(state.urls)).length) || (state.files.length > 0)) {
      return true
    } else if (state.content.length < 1) {
      return true
    }
    return false
  }

  const hasUpdate = (): boolean => {
    const currentContent = data.content.map((item) => item.id)
    // We only check the order because newly added files are committed automatically
    if (state.content === []) return false
    return !compareTwoArrayOrders(currentContent, state.content)
  }

  const onUpdateContent = (): void => {
    updateContent({
      variables: {
        input: {
          id: data.id,
          contentIds: state.content
        }
      },
      onCompleted () {
        dispatch({
          type: 'content',
          value: [],
          transform: 'SET'
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
