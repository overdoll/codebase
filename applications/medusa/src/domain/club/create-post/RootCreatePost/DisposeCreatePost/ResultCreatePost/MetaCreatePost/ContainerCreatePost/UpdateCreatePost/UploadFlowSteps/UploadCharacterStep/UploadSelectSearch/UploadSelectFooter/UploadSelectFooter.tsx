import { useUpdateEffect } from '@chakra-ui/react'
import { useSequenceContext } from '@//:modules/content/HookedComponents/Sequence'
import { useContext } from 'react'
import { FlowContext } from '@//:modules/content/PageLayout/FlowBuilder/FlowBuilder'

export default function UploadSelectFooter (): JSX.Element {
  const {
    state
  } = useSequenceContext()

  const { skipToStep } = useContext(FlowContext)

  useUpdateEffect(() => {
    if (state.deepValue == null) {
      skipToStep('select_search')
    }
  }, [state.deepValue])

  return <></>
}
