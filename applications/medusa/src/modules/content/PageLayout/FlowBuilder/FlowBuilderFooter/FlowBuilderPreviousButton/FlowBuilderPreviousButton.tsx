import { useContext } from 'react'
import { FlowContext } from '../../FlowBuilder'
import Button from '../../../../../form/Button/Button'
import { Trans } from '@lingui/macro'
import { ButtonProps } from '@chakra-ui/react'

type Props = ButtonProps

export default function FlowBuilderPreviousButton (props: Props): JSX.Element {
  const { previousStep } = useContext(FlowContext)

  return (
    <Button
      onClick={previousStep}
      size='lg'
      colorScheme='gray'
      variant='solid'
      {...props}
    >
      <Trans>
        Back
      </Trans>
    </Button>
  )
}
