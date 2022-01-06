import { EVENTS, STEPS } from '../../../../../constants/constants'
import Button from '@//:modules/form/Button/Button'
import { Trans } from '@lingui/macro'
import { useContext } from 'react'
import { DispatchContext, StateContext } from '../../../../../context'

export default function FlowBackwardButton (): JSX.Element {
  const state = useContext(StateContext)
  const dispatch = useContext(DispatchContext)

  const goBack = (): void => {
    switch (state.step) {
      case STEPS.AUDIENCE:
        dispatch({
          type: EVENTS.STEP,
          value: STEPS.ARRANGE
        })
        break
      case STEPS.CATEGORY:
        dispatch({
          type: EVENTS.STEP,
          value: STEPS.AUDIENCE
        })
        break
      case STEPS.CHARACTER:
        dispatch({
          type: EVENTS.STEP,
          value: STEPS.CATEGORY
        })
        break
      case STEPS.REVIEW:
        dispatch({
          type: EVENTS.STEP,
          value: STEPS.CHARACTER
        })
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
          colorScheme='gray'
          size='lg'
          onClick={goBack}
        ><Trans>
          Back
        </Trans>
        </Button>
      )
  }
}
