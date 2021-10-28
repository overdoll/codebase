/**
 * @flow
 */
import type { Node } from 'react'
import { EVENTS, INITIAL_STATE, STEPS } from '../../../../../constants/constants'
import Button from '@//:modules/form/Button'
import type { Uppy } from '@uppy/core'
import type { Dispatch, State } from '@//:types/upload'
import { useTranslation } from 'react-i18next'
import { StringParam, useQueryParam } from 'use-query-params'
import { graphql, useMutation } from 'react-relay/hooks'
import { useFragment } from 'react-relay'
import type { FlowForwardButtonFragment$key } from '@//:artifacts/FlowForwardButtonFragment.graphql'
import { useUpdateContent, useUpdateAudience } from './queries'

type Props = {
  uppy: Uppy,
  state: State,
  dispatch: Dispatch,
  query: FlowForwardButtonFragment$key
}

const FlowForwardButtonFragmentGQL = graphql`
  fragment FlowForwardButtonFragment on Post {
    id
    content {
      id
    }
    audience {
      id
    }
    ...useUpdateContentFragment
    ...useUpdateAudienceFragment
  }
`

export default function FlowForwardButton ({ uppy, dispatch, state, isDisabled, query }: Props): Node {
  const data = useFragment(FlowForwardButtonFragmentGQL, query)
  const [postReference, setPostReference] = useQueryParam('id', StringParam)

  const [onUpdateContent, isUpdatingContent] = useUpdateContent({ uppy, dispatch, state, query: data })
  const [onUpdateAudience, isUpdatingAudience] = useUpdateAudience({ uppy, dispatch, state, query: data })

  const contentData = state.content || data.content

  const [t] = useTranslation('manage')

  const goForward = (): void => {
    switch (state.step) {
      case STEPS.ARRANGE:
        // If the user has not rearranged or edited the post content, we skip the updating
        if (state.content) {
          onUpdateContent()
          break
        }
        dispatch({ type: EVENTS.STEP, value: STEPS.AUDIENCE })
        break
      case STEPS.AUDIENCE:
        if (state.audience !== data.audience?.id) {
          onUpdateAudience()
          break
        }
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
        // check if there are any files still uploading or if there are no files uploaded
        if ((state.files.length !== (Object.keys(state.urls)).length) || (state.files.length > 0)) {
          return true
        } else if (contentData.length < 1) {
          return true
        }
        return false
      case STEPS.AUDIENCE:
        // Check if there are no audience selections
        return (!state.audience)
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
    return isUpdatingContent || isUpdatingAudience
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
