import { STEPS } from '../../../../../constants/constants'
import type { Uppy } from '@uppy/core'
import type { Dispatch, State } from '@//:types/upload'
import { graphql } from 'react-relay/hooks'
import { useFragment } from 'react-relay'
import {
  SubmitPostButton,
  UpdateAudienceButton,
  UpdateBrandButton,
  UpdateCategoryButton,
  UpdateCharacterButton,
  UpdateContentButton
} from './components'
import { FlowForwardButtonFragment$key } from '@//:artifacts/FlowForwardButtonFragment.graphql'

interface Props {
  uppy: Uppy
  state: State
  dispatch: Dispatch
  query: FlowForwardButtonFragment$key
}

const FlowForwardButtonFragmentGQL = graphql`
  fragment FlowForwardButtonFragment on Post {
    ...SubmitPostButtonFragment
    ...UpdateAudienceButton
    ...UpdateBrandButtonFragment
    ...UpdateCategoryButtonFragment
    ...UpdateCharacterButtonFragment
    ...UpdateContentButtonFragment
  }
`

export default function FlowForward ({
  uppy,
  dispatch,
  state,
  query
}: Props): JSX.Element {
  const data = useFragment(FlowForwardButtonFragmentGQL, query)

  switch (state.step) {
    case STEPS.ARRANGE:
      return (
        <UpdateContentButton
          uppy={uppy}
          state={state}
          dispatch={dispatch}
          query={data}
        />
      )
    case STEPS.AUDIENCE:
      return (
        <UpdateAudienceButton
          uppy={uppy}
          state={state}
          dispatch={dispatch}
          query={data}
        />
      )
    case STEPS.BRAND:
      return (
        <UpdateBrandButton
          uppy={uppy}
          state={state}
          dispatch={dispatch}
          query={data}
        />
      )
    case STEPS.CATEGORY:
      return (
        <UpdateCategoryButton
          uppy={uppy}
          state={state}
          dispatch={dispatch}
          query={data}
        />
      )
    case STEPS.CHARACTER:
      return (
        <UpdateCharacterButton
          uppy={uppy}
          state={state}
          dispatch={dispatch}
          query={data}
        />
      )
    case STEPS.REVIEW:
      return (
        <SubmitPostButton
          uppy={uppy}
          state={state}
          dispatch={dispatch}
          query={data}
        />
      )
    default:
      return <></>
  }
}
