/**
 * @flow
 */
import type { Node } from 'react'
import { EVENTS, INITIAL_STATE, STEPS } from '../../../../constants/constants'
import Button from '@//:modules/form/Button'
import type { Uppy } from '@uppy/core'
import type { Dispatch, State } from '@//:types/upload'
import { useTranslation } from 'react-i18next'
import { StringParam, useQueryParam } from 'use-query-params'
import { graphql, useMutation } from 'react-relay/hooks'
import type FlowForwardButtonMutation from '@//:artifacts/FlowForwardButtonMutation.graphql'
import { useFragment } from 'react-relay'
import type { FlowForwardButtonFragment$key } from '@//:artifacts/FlowForwardButtonFragment.graphql'
import { useToast } from '@chakra-ui/react'

type Props = {
  uppy: Uppy,
  state: State,
  dispatch: Dispatch,
  isDisabled: boolean,
  query: FlowForwardButtonFragment$key
}

const FlowForwardButtonFragmentGQL = graphql`
  fragment FlowForwardButtonFragment on Post {
    id
  }
`

const FlowForwardButtonMutationGQL = graphql`
  mutation FlowForwardButtonMutation ($input: UpdatePostContentInput!) {
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

export default function FlowForwardButton ({ uppy, dispatch, state, isDisabled, query }: Props): Node {
  const data = useFragment(FlowForwardButtonFragmentGQL, query)

  const [updateContent, isUpdatingContent] = useMutation<FlowForwardButtonMutation>(FlowForwardButtonMutationGQL)

  const [postReference, setPostReference] = useQueryParam('id', StringParam)

  const notify = useToast()

  const [t] = useTranslation('manage')

  const onUpdateContent = () => {
    const currentURLs = state.content.map((item) =>
      item.urls[0].url)

    updateContent({
      variables: {
        input: {
          id: data.id,
          content: currentURLs
        }
      },
      onCompleted (data) {
        dispatch({ type: EVENTS.CLEAR_CONTENT })
        dispatch({ type: EVENTS.STEP, value: STEPS.AUDIENCE })
      },
      onError (data) {
        notify({
          status: 'error',
          title: t('posts.flow.steps.arrange.arranger.query.error'),
          isClosable: true
        })
      }
    })
  }

  const goForward = (): void => {
    switch (state.step) {
      case STEPS.ARRANGE:
        if (state.content) {
          onUpdateContent()
          break
        }
        dispatch({ type: EVENTS.STEP, value: STEPS.AUDIENCE })
        break
      case STEPS.AUDIENCE:
        dispatch({ type: EVENTS.STEP, value: STEPS.BRAND })
        break
      case STEPS.BRAND:
        dispatch({ type: EVENTS.STEP, value: STEPS.CATEGORY })
        break
      case STEPS.CATEGORY:
        dispatch({ type: EVENTS.STEP, value: STEPS.CHARACTER })
        break
      case STEPS.CHARACTER:
        dispatch({ type: EVENTS.STEP, value: STEPS.REVIEW })
        break
      default:
        break
    }
  }

  const buttonDisabled = () => {
    switch (state.step) {
      case STEPS.ARRANGE:
        return (state.files.length !== (Object.keys(state.urls)).length) || (state.files.length > 0)
      default:
        return false
    }
  }

  const onSubmitPost = () => {
    // query for submitting post. on success, runs the functions below
    uppy.reset()
    dispatch({ type: EVENTS.CLEANUP, value: INITIAL_STATE })
    setPostReference(undefined)
    dispatch({ type: EVENTS.STEP, value: STEPS.SUBMIT })
  }

  const buttonLoading = () => {
    return isDisabled || isUpdatingContent
  }

  switch (state.step) {
    case STEPS.REVIEW:
      return (
        <Button
          colorScheme='primary' size='lg'
          isDisabled={buttonDisabled()}
          isLoading={buttonLoading()}
          onClick={onSubmitPost}
        >{t('posts.flow.steps.footer.submit')}
        </Button>
      )
    case STEPS.SUBMIT:
      return <></>
    default:
      return (
        <Button
          colorScheme='gray' size='lg'
          isDisabled={buttonDisabled()}
          isLoading={buttonLoading()}
          onClick={goForward}
        >{t('posts.flow.steps.footer.forward')}
        </Button>
      )
  }
}
