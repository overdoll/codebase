import { useContext } from 'react'
import { FlowContext } from '../FlowBuilder'
import { Box, BoxProps } from '@chakra-ui/react'

type Props = BoxProps

export default function FlowBuilderBody (props: Props): JSX.Element {
  const {
    currentStep,
    stepsComponents
  } = useContext(FlowContext)

  return (
    <Box minH={300} {...props}>
      {stepsComponents[currentStep]}
    </Box>
  )
}
