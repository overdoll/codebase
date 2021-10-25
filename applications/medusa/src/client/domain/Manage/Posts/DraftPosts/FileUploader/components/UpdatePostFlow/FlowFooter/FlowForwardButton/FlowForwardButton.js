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

type Props = {
  uppy: Uppy,
  state: State,
  dispatch: Dispatch,
  isDisabled: boolean,
}

export default function FlowForwardButton ({ uppy, dispatch, state, isDisabled }: Props): Node {
  const [postReference, setPostReference] = useQueryParam('id', StringParam)

  const [t] = useTranslation('manage')

  const onSubmitPost = () => {
    // query for submitting post. on success, runs the functions below
    uppy.reset()
    dispatch({ type: EVENTS.CLEANUP, value: INITIAL_STATE })
    setPostReference(undefined)
    dispatch({ type: EVENTS.STEP, value: STEPS.SUBMIT })
  }

  const goForward = (): void => {
    switch (state.step) {
      case STEPS.ARRANGE:
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

  switch (state.step) {
    case STEPS.REVIEW:
      return (
        <Button
          colorScheme='primary' size='lg'
          isDisabled={buttonDisabled()}
          isLoading={isDisabled}
          onClick={onSubmitPost}
        >{t('posts.flow.steps.footer.submit')}
        </Button>
      )
    case STEPS.SUBMIT:
      return <></>
    default:
      return (
        <Button
          isDisabled={buttonDisabled()}
          isLoading={isDisabled} colorScheme='gray' size='lg'
          onClick={goForward}
        >{t('posts.flow.steps.footer.forward')}
        </Button>
      )
  }
}
