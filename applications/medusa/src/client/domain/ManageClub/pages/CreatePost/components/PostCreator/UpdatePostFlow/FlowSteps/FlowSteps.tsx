import { STEPS } from '../../../../constants/constants'
import Arrange from './Arrange/Arrange'
import Audience from './Audience/Audience'
import Category from './Category/Category'
import Character from './Character/Character'
import Review from './Review/Review'
import Submit from './Submit/Submit'
import { graphql } from 'react-relay/hooks'
import type { FlowStepsFragment$key } from '@//:artifacts/FlowStepsFragment.graphql'
import { useFragment } from 'react-relay'
import { useContext } from 'react'
import { StateContext } from '../../../../context'
import Process from './Process/Process'

interface Props {
  query: FlowStepsFragment$key
}

const FlowStepsFragmentGQL = graphql`
  fragment FlowStepsFragment on Post {
    ...ArrangeFragment
    ...AudienceFragment
    ...CategoryFragment
    ...CharacterFragment
    ...ReviewFragment
    ...ProcessFragment
  }
`

export default function FlowSteps ({
  query
}: Props): JSX.Element {
  const data = useFragment(FlowStepsFragmentGQL, query)

  const state = useContext(StateContext)

  switch (state.step) {
    case STEPS.AUDIENCE:

      return <Audience query={data} />

    case STEPS.CATEGORY:

      return <Category query={data} />

    case STEPS.CHARACTER:

      return <Character query={data} />

    case STEPS.PROCESS:

      return <Process query={data} />

    case STEPS.REVIEW:

      return <Review query={data} />

    case STEPS.SUBMIT:

      return <Submit />

    default:
      return <Arrange query={data} />
  }
}
