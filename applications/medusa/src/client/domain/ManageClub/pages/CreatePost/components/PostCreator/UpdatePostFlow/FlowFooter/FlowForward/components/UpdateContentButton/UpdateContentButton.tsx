import { useToast } from '@chakra-ui/react'
import { graphql, useMutation } from 'react-relay/hooks'
import { useFragment } from 'react-relay'
import { EVENTS, STEPS } from '../../../../../../../constants/constants'
import type { UpdateContentButtonFragment$key } from '@//:artifacts/UpdateContentButtonFragment.graphql'
import type { UpdateContentButtonMutation } from '@//:artifacts/UpdateContentButtonMutation.graphql'
import Button from '@//:modules/form/Button/Button'
import { compareTwoArrayOrders } from '@//:modules/support'
import { t, Trans } from '@lingui/macro'
import { useContext } from 'react'
import { DispatchContext, StateContext } from '../../../../../../../context'

interface Props {
  query: UpdateContentButtonFragment$key
}

const Fragment = graphql`
  fragment UpdateContentButtonFragment on Post {
    id
    content {
      urls {
        url
      }
    }
  }
`

const Mutation = graphql`
  mutation UpdateContentButtonMutation ($input: UpdatePostContentInput!) {
    updatePostContent(input: $input) {
      post {
        id
        content {
          id
          type
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
  query
}: Props): JSX.Element {
  const state = useContext(StateContext)
  const dispatch = useContext(DispatchContext)
  const data = useFragment(Fragment, query)

  const [updateContent, isUpdatingContent] = useMutation<UpdateContentButtonMutation>(Mutation)

  const notify = useToast()

  const buttonDisabled = (): boolean => {
    if ((state.files.length !== (Object.keys(state.urls)).length) || (state.files.length > 0)) {
      return true
    } else if (state.content == null) {
      return true
    } else if (state.content.length < 1) {
      return true
    }
    return false
  }

  const hasUpdate = (): boolean => {
    const currentContent = data.content.map((item) => item.urls[0].url)
    // We only check the order because newly added files are committed automatically
    if (state.content == null) return false
    return !compareTwoArrayOrders(currentContent, state.content)
  }

  const goNext = (): void => {
    dispatch({
      type: EVENTS.STEP,
      value: STEPS.AUDIENCE
    })
  }

  const onUpdateContent = (): void => {
    console.log(state.content)

    updateContent({
      variables: {
        input: {
          id: data.id,
          content: state.content as string[]
        }
      },
      onCompleted () {
        dispatch({
          type: EVENTS.CONTENT,
          clear: true,
          value: null
        })
        dispatch({
          type: EVENTS.STEP,
          value: STEPS.AUDIENCE
        })
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
      <Button
        colorScheme='green'
        size='lg'
        isDisabled={buttonDisabled()}
        isLoading={isUpdatingContent}
        onClick={onUpdateContent}
      >
        <Trans>
          Save
        </Trans>
      </Button>
    )
  }

  return (
    <Button
      colorScheme='gray'
      size='lg'
      isDisabled={buttonDisabled()}
      onClick={goNext}
    >
      <Trans>
        Next
      </Trans>
    </Button>
  )
}
