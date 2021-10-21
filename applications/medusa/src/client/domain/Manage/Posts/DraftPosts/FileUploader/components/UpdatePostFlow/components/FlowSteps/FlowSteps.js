/**
 * @flow
 */
import type { Node } from 'react'
import { STEPS } from '../../constants/constants'
import Arrange from '../UpdatePostFlow/Arrange/Arrange'
import Audience from '../UpdatePostFlow/Audience/Audience'
import Brand from '../UpdatePostFlow/Brand/Brand'
import Category from '../UpdatePostFlow/Category/Category'
import Character from '../UpdatePostFlow/Character/Character'
import Review from '../UpdatePostFlow/Review/Review'
import Submit from '../UpdatePostFlow/Submit/Submit'
import type { Uppy } from '@uppy/core'
import type { Dispatch, State } from '@//:types/upload'

type Props = {
  uppy: Uppy,
  state: State,
  dispatch: Dispatch,
};

export default function FlowSteps ({ uppy, dispatch, state }: Props): Node {
  switch (state.step) {
    case STEPS.ARRANGE:

      return <Arrange uppy={uppy} dispatch={dispatch} state={state} />

    case STEPS.AUDIENCE:

      return <Audience />

    case STEPS.BRAND:

      return <Brand />

    case STEPS.CATEGORY:

      return <Category />

    case STEPS.CHARACTER:

      return <Character />

    case STEPS.REVIEW:

      return <Review />

    case STEPS.SUBMIT:

      return <Submit />

    default:
      return <Arrange uppy={uppy} dispatch={dispatch} state={state} />
  }
}
