import { useContext } from 'react'
import { FlowContext } from '../../FlowBuilder'
import Button from '@//:modules/form/Button/Button'
import { Trans } from '@lingui/macro'

export default function FlowBuilderPreviousButton (): JSX.Element {
  const { previousStep } = useContext(FlowContext)

  return (
    <Button
      onClick={previousStep}
      size='lg'
      colorScheme='gray'
      variant='solid'
    >
      <Trans>
        Back
      </Trans>
    </Button>
  )
}
