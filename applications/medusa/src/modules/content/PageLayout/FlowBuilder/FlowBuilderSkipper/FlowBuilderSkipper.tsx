import { Box, HStack } from '@chakra-ui/react'
import { useContext } from 'react'
import { FlowContext } from '../FlowBuilder'
import { ClickableBox } from '../../index'
import Icon from '../../BuildingBlocks/Icon/Icon'

interface Props {
  canSkipSteps?: boolean
}

export default function FlowBuilderSkipper ({ canSkipSteps = true }: Props): JSX.Element {
  const {
    currentStep,
    stepsHeaders,
    stepsArray,
    skipToStep,
    colorScheme
  } = useContext(FlowContext)

  return (
    <HStack justify='center' spacing={2}>
      {stepsArray.map((item) =>
        <ClickableBox
          isDisabled={!canSkipSteps}
          onClick={() => skipToStep(item)}
          key={item}
          p={0}
          borderRadius='md'
          w={8}
        >
          <Box
            borderRadius='inherit'
            bg={item === currentStep ? `${colorScheme as string}.300` : 'transparent'}
            p={2}
          >
            <Icon
              h={4}
              w={4}
              icon={stepsHeaders[item].icon}
              fill={item === currentStep ? 'gray.00' : 'gray.100'}
            />
          </Box>
        </ClickableBox>)}
    </HStack>
  )
}
