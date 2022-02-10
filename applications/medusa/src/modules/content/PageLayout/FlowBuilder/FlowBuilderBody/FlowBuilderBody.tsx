import { useContext } from 'react'
import { FlowContext } from '../FlowBuilder'
import { Box } from '@chakra-ui/react'

export default function FlowBuilderBody (): JSX.Element {
  const {
    currentStep,
    stepsComponents
  } = useContext(FlowContext)

  return (
    <Box minH={300}>
      {stepsComponents[currentStep]}
    </Box>
  )
}