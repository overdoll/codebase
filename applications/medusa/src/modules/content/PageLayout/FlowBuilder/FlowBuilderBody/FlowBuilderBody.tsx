import { useContext } from 'react'
import { FlowContext } from '../FlowBuilder'
import { Box, BoxProps } from '@chakra-ui/react'

interface Props extends BoxProps {
  ignoreBox?: boolean
}

export default function FlowBuilderBody (props: Props): JSX.Element {
  const {
    ignoreBox,
    ...rest
  } = props

  const {
    currentStep,
    stepsComponents
  } = useContext(FlowContext)

  if (ignoreBox === true) {
    return (
      <>{stepsComponents[currentStep]}</>
    )
  }

  return (
    <Box minH={300} {...rest}>
      {stepsComponents[currentStep]}
    </Box>
  )
}
