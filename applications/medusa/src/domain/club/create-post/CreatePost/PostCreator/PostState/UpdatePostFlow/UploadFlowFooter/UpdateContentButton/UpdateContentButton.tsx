import { FlowBuilderNextButton } from '@//:modules/content/PageLayout'
import { useSequenceContext } from '@//:modules/content/HookedComponents/Sequence'
import { graphql } from 'react-relay/hooks'
import { UpdateContentButtonFragment$key } from '@//:artifacts/UpdateContentButtonFragment.graphql'
import { useFragment } from 'react-relay'

interface Props {
  query: UpdateContentButtonFragment$key
}

const Fragment = graphql`
  fragment UpdateContentButtonFragment on Post {
    content {
      __typename
    }
  }
`

export default function UpdateContentButton ({ query }: Props): JSX.Element {
  const {
    state
  } = useSequenceContext()

  const data = useFragment(Fragment, query)

  const buttonDisabled = (): boolean => {
    if ((Object.values(state.files).length !== (Object.keys(state.urls)).length) || (Object.values(state.files).length > 0)) {
      return true
    }

    return data.content.length < 1
  }

  return (
    <FlowBuilderNextButton
      isDisabled={buttonDisabled()}
    />
  )
}
