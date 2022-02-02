import { useContext } from 'react'
import { FlowContext } from '../../FlowBuilder'
import Button from '../../../../../form/Button/Button'
import { Trans } from '@lingui/macro'

export default function FlowBuilderNextButton (): JSX.Element {
  const { nextStep } = useContext(FlowContext)

  return (
    <Button
      onClick={nextStep}
      size='lg'
      colorScheme='gray'
      variant='solid'
    >
      <Trans>
        Next
      </Trans>
    </Button>
  )
}
