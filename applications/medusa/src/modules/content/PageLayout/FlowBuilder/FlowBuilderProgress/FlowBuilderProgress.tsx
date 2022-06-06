import { Box, HStack } from '@chakra-ui/react'
import { useContext } from 'react'
import { FlowContext } from '../FlowBuilder'

export default function FlowBuilderHeader (): JSX.Element {
  const {
    currentStep,
    stepsArray,
    colorScheme
  } = useContext(FlowContext)

  return (
    <HStack spacing={2}>
      {stepsArray.map((item, index) =>
        <Box
          key={index}
          h={2}
          w='100%'
          borderRadius='md'
          bg={currentStep === item ? `${colorScheme as string}.300` : 'gray.700'}
        />)}
    </HStack>
  )
}
