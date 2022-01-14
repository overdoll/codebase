import { STEPS } from '../../../../../constants/constants'
import { graphql } from 'react-relay/hooks'
import { useFragment } from 'react-relay'
import {
  ProcessButton,
  SubmitPostButton,
  UpdateAudienceButton,
  UpdateCategoryButton,
  UpdateCharacterButton,
  UpdateContentButton
} from './components'
import { FlowForwardButtonFragment$key } from '@//:artifacts/FlowForwardButtonFragment.graphql'
import { useContext } from 'react'
import { StateContext } from '../../../../../context'

interface Props {
  query: FlowForwardButtonFragment$key
}

const FlowForwardButtonFragmentGQL = graphql`
  fragment FlowForwardButtonFragment on Post {
    ...SubmitPostButtonFragment
    ...UpdateAudienceButton
    ...UpdateCategoryButtonFragment
    ...UpdateCharacterButtonFragment
    ...UpdateContentButtonFragment
    ...ProcessButtonFragment
  }
`

export default function FlowForward ({
  query
}: Props): JSX.Element {
  const data = useFragment(FlowForwardButtonFragmentGQL, query)

  const state = useContext(StateContext)

  switch (state.step) {
    case STEPS.ARRANGE:
      return (
        <UpdateContentButton
          query={data}
        />
      )
    case STEPS.AUDIENCE:
      return (
        <UpdateAudienceButton
          query={data}
        />
      )
    case STEPS.CATEGORY:
      return (
        <UpdateCategoryButton
          query={data}
        />
      )
    case STEPS.CHARACTER:
      return (
        <UpdateCharacterButton
          query={data}
        />
      )
    case STEPS.PROCESS:
      return (
        <ProcessButton
          query={data}
        />
      )
    case STEPS.REVIEW:
      return (
        <SubmitPostButton
          query={data}
        />
      )
    default:
      return <></>
  }
}
