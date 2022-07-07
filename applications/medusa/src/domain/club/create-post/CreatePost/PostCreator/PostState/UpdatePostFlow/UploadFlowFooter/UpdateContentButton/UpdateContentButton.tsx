import { FlowBuilderNextButton } from '@//:modules/content/PageLayout'
import { useSequenceContext } from '@//:modules/content/HookedComponents/Sequence'

export default function UpdateContentButton (): JSX.Element {
  const {
    state
  } = useSequenceContext()

  const buttonDisabled = (): boolean => {
    if (state.isRearranging === true) {
      return true
    }
    if ((state.files.length !== (Object.keys(state.urls)).length) || (state.files.length > 0)) {
      return true
    }

    return state.content.length < 1
  }

  return (
    <FlowBuilderNextButton
      isDisabled={buttonDisabled()}
    />
  )
}
