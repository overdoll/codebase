/**
 * @flow
 */
import type { Node } from 'react'
import { EVENTS, STEPS } from '../../../constants/constants'
import Button from '@//:modules/form/Button'
import type { Uppy } from '@uppy/core'
import type { Dispatch, State } from '@//:types/upload'
import { useTranslation } from 'react-i18next'

type Props = {
  uppy: Uppy,
  state: State,
  dispatch: Dispatch,
  onSubmit: () => void,
}

// TODO mutations for audience, brand, category, character go here
// TODO when removing a tag, wait 5 seconds and if there are no changes then it runs?

export default function FlowForwardButton ({ uppy, dispatch, state, onSubmit }: Props): Node {
  const [t] = useTranslation('manage')

  // Tagging step - disabled if the conditions aren't met
  const NextDisabled =
    state.step === STEPS.TAG &&
    (Object.keys(state.characters).length < 1 ||
      Object.keys(state.artist).length < 1 ||
      Object.keys(state.categories).length < 3)

  // If the amount of files != the amount of urls (not all files were uploaded), then we can't submit yet
  const SubmitDisabled = state.files.length !== Object.keys(state.urls).length

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

  switch (state.step) {
    case STEPS.REVIEW:
      return (
        <Button
          colorScheme='primary' size='lg'
          onClick={onSubmit}
        >{t('posts.flow.steps.footer.submit')}
        </Button>
      )
    case STEPS.SUBMIT:
      return <></>
    default:
      return <Button colorScheme='gray' size='lg' onClick={goForward}>{t('posts.flow.steps.footer.forward')}</Button>
  }
}
