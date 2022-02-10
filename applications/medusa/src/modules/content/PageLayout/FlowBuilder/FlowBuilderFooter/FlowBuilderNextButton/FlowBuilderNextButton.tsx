import { useContext } from 'react'
import { FlowContext } from '../../FlowBuilder'
import Button from '../../../../../form/Button/Button'
import { Trans } from '@lingui/macro'

interface Props {
  isDisabled?: boolean | undefined
}

export default function FlowBuilderNextButton ({ isDisabled }: Props): JSX.Element {
  const { nextStep } = useContext(FlowContext)

  return (
    <Button
      isDisabled={isDisabled}
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
