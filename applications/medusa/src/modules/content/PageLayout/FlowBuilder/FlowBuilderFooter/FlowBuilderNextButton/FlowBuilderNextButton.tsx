import { useContext } from 'react'
import { FlowContext } from '../../FlowBuilder'
import Button from '../../../../../form/Button/Button'
import { Trans } from '@lingui/macro'
import { ButtonProps } from '@chakra-ui/react'

interface Props extends ButtonProps {
  isDisabled?: boolean | undefined
}

export default function FlowBuilderNextButton ({ isDisabled, ...rest }: Props): JSX.Element {
  const { nextStep } = useContext(FlowContext)

  return (
    <Button
      isDisabled={isDisabled}
      onClick={nextStep}
      size='lg'
      colorScheme='gray'
      variant='solid'
      {...rest}
    >
      <Trans>
        Next
      </Trans>
    </Button>
  )
}
