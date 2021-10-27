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
import type { FlowStepsFragment$key } from '@//:artifacts/FlowStepsFragment.graphql'
import { useFragment } from 'react-relay'

type Props = {
  uppy: Uppy,
  state: State,
  dispatch: Dispatch,
  query: FlowStepsFragment$key
};

const FlowStepsFragmentGQL = graphql`
  fragment FlowStepsFragment on Post {
    ...ArrangeFragment
  }
`

export default function FlowSteps ({ uppy, dispatch, state, query }: Props): Node {
  const data = useFragment(FlowStepsFragmentGQL, query)

  switch (state.step) {
    case STEPS.ARRANGE:

      return <Arrange uppy={uppy} dispatch={dispatch} state={state} query={data} />

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
