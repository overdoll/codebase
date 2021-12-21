import type { Dispatch, State } from '@//:types/upload'
import { useToast } from '@chakra-ui/react'
import type { Uppy } from '@uppy/core'
import { graphql, useMutation } from 'react-relay/hooks'
import { useFragment } from 'react-relay'
import { useTranslation } from 'react-i18next'
import { EVENTS, STEPS } from '../../../../../../../constants/constants'
import type { UpdateContentButtonFragment$key } from '@//:artifacts/UpdateContentButtonFragment.graphql'
import type { UpdateContentButtonMutation } from '@//:artifacts/UpdateContentButtonMutation.graphql'

import Button from '@//:modules/form/Button/Button'
import { compareTwoArrayOrders } from '@//:modules/support'

interface Props {
  uppy: Uppy
  state: State
  dispatch: Dispatch
  query: UpdateContentButtonFragment$key
}

const Fragment = graphql`
  fragment UpdateContentButtonFragment on Post {
    id
    content {
      id
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
  state,
  uppy,
  dispatch,
  query
}: Props): JSX.Element {
  const data = useFragment(Fragment, query)

  const [updateContent, isUpdatingContent] = useMutation<UpdateContentButtonMutation>(Mutation)

  const [t] = useTranslation('manage')

  const notify = useToast()

  const contentData = state.content ?? data.content

  const buttonDisabled = (): boolean => {
    if ((state.files.length !== (Object.keys(state.urls)).length) || (state.files.length > 0)) {
      return true
    } else if (contentData.length < 1) {
      return true
    }
    return false
  }

  const checkUpdate = (): void => {
    const currentContent = data.content.map((item) => item.id)
    const stateContent = (state.content ?? data.content).map((item) => item.id)

    if (state.content != null && !compareTwoArrayOrders(currentContent, stateContent)) {
      onUpdateContent()
      return
    }
    dispatch({
      type: EVENTS.STEP,
      value: STEPS.AUDIENCE
    })
  }

  const onUpdateContent = (): void => {
    const currentURLs = state.content.map((item) =>
      item.urls[0].url) as string[]

    updateContent({
      variables: {
        input: {
          id: data.id,
          content: currentURLs
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
          title: t('create_post.flow.steps.arrange.arranger.query.error'),
          isClosable: true
        })
      }
    })
  }

  return (
    <Button
      colorScheme='gray'
      size='lg'
      isDisabled={buttonDisabled()}
      isLoading={isUpdatingContent}
      onClick={checkUpdate}
    >{t('create_post.flow.steps.footer.forward')}
    </Button>
  )
}
