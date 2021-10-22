/**
 * @flow
 */
import type { Node } from 'react'
import { EVENTS, STEPS } from '../../../constants/constants'
import Arrange from './Arrange/Arrange'
import Audience from './Audience/Audience'
import Brand from './Brand/Brand'
import Category from './Category/Category'
import Character from './Character/Character'
import Review from './Review/Review'
import Submit from './Submit/Submit'
import type { Uppy } from '@uppy/core'
import type { Dispatch, State } from '@//:types/upload'
import { graphql, useMutation } from 'react-relay/hooks'
import type CreatePostQuery from '@//:artifacts/CreatePostQuery.graphql'
import type FlowStepsMutation from '@//:artifacts/FlowStepsMutation.graphql'
import { useEffect } from 'react'
import type { UpdatePostFlowFragment$key } from '@//:artifacts/UpdatePostFlowFragment.graphql'

type Props = {
  uppy: Uppy,
  state: State,
  dispatch: Dispatch,
  query: UpdatePostFlowFragment$key
};

export default function FlowSteps ({ uppy, dispatch, state, query }: Props): Node {
  switch (state.step) {
    case STEPS.ARRANGE:

      return <Arrange uppy={uppy} dispatch={dispatch} state={state} query={query} />

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
      return <Arrange uppy={uppy} dispatch={dispatch} state={state} query={query} />
  }
}
