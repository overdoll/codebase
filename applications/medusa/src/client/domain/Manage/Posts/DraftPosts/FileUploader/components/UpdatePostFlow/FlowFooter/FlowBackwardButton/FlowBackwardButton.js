/**
 * @flow
 */
import type { Node } from 'react'
import { EVENTS, STEPS } from '../../../../constants/constants'
import Button from '@//:modules/form/Button'
import type { Uppy } from '@uppy/core'
import type { Dispatch, State } from '@//:types/upload'
import { useTranslation } from 'react-i18next'

type Props = {
  uppy: Uppy,
  state: State,
  dispatch: Dispatch,
  isDisabled: boolean,
}

// TODO mutations for audience, brand, category, character go here
// TODO when removing a tag, wait 5 seconds and if there are no changes then it runs?

export default function FlowBackwardButton ({ uppy, dispatch, state, isDisabled }: Props): Node {
  const [t] = useTranslation('manage')

  const goBack = (): void => {
    switch (state.step) {
      case STEPS.AUDIENCE:
        dispatch({ type: EVENTS.STEP, value: STEPS.ARRANGE })
        break
      case STEPS.BRAND:
        dispatch({ type: EVENTS.STEP, value: STEPS.AUDIENCE })
        break
      case STEPS.CATEGORY:
        dispatch({ type: EVENTS.STEP, value: STEPS.BRAND })
        break
      case STEPS.CHARACTER:
        dispatch({ type: EVENTS.STEP, value: STEPS.CATEGORY })
        break
      case STEPS.REVIEW:
        dispatch({ type: EVENTS.STEP, value: STEPS.CHARACTER })
        break
      default:
        break
    }
  }

  switch (state.step) {
    case STEPS.SUBMIT:
      return <></>
    case STEPS.ARRANGE:
      return <></>
    default:
      return (
        <Button
          isLoading={isDisabled} colorScheme='gray' size='lg'
          onClick={goBack}
        >{t('posts.flow.steps.footer.back')}
        </Button>
      )
  }
}
