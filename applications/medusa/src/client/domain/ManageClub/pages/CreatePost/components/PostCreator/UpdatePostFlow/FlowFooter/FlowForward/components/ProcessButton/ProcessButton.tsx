import { graphql } from 'react-relay/hooks'
import { useFragment } from 'react-relay'
import { EVENTS, STEPS } from '../../../../../../../constants/constants'
import type { ProcessButtonFragment$key } from '@//:artifacts/ProcessButtonFragment.graphql'
import Button from '@//:modules/form/Button/Button'
import { Trans } from '@lingui/macro'
import { useContext } from 'react'
import { DispatchContext } from '../../../../../../../context'

interface Props {
  query: ProcessButtonFragment$key
}

const Fragment = graphql`
  fragment ProcessButtonFragment on Post {
    id
    content {
      id
      processed
    }
  }
`

export default function ProcessButton ({
  query
}: Props): JSX.Element {
  const dispatch = useContext(DispatchContext)
  const data = useFragment(Fragment, query)

  const buttonDisabled = (): boolean => {
    const processed = data.content.map((item) => item.processed)
    return processed.every(x => x)
  }

  const goNext = (): void => {
    dispatch({
      type: EVENTS.STEP,
      value: STEPS.REVIEW
    })
  }

  return (
    <Button
      w='100%'
      colorScheme='gray'
      size='lg'
      isDisabled={!buttonDisabled()}
      onClick={goNext}
    >
      <Trans>
        Next
      </Trans>
    </Button>
  )
}
