import { Flex } from '@chakra-ui/react'
import { ReactNode, useContext } from 'react'
import { FlowContext } from '../FlowBuilder'
import FlowBuilderPreviousButton from './FlowBuilderPreviousButton/FlowBuilderPreviousButton'
import FlowBuilderNextButton from './FlowBuilderNextButton/FlowBuilderNextButton'

interface ChildrenCallable {
  currentStep: string
  nextStep: () => void
  previousStep: () => void
  isAtStart: boolean
  isAtEnd: boolean
}

interface Props {
  children?: (ChildrenCallable: ChildrenCallable) => ReactNode | null
}

export default function FlowBuilderFooter ({ children }: Props): JSX.Element {
  const {
    currentStep,
    stepsArray,
    nextStep,
    previousStep
  } = useContext(FlowContext)

  const currentIndex = stepsArray.indexOf(currentStep)

  const isAtStart = stepsArray.length === 1 || currentIndex === 0
  const isAtEnd = stepsArray.length === 1 || stepsArray.length - 1 === currentIndex

  if (children == null) {
    if (stepsArray.length === 1) return <></>

    switch (currentIndex) {
      case stepsArray.length - 1:
        return (
          <Flex justify='flex-start'>
            <FlowBuilderPreviousButton />
          </Flex>
        )
      case 0:
        return (
          <Flex justify='flex-end'>
            <FlowBuilderNextButton />
          </Flex>
        )
      default:
        return (
          <Flex justify='space-between'>
            <FlowBuilderPreviousButton />
            <FlowBuilderNextButton />
          </Flex>
        )
    }
  }

  return (
    <Flex>
      {children?.({
        currentStep: currentStep,
        nextStep: nextStep,
        previousStep: previousStep,
        isAtStart: isAtStart,
        isAtEnd: isAtEnd
      })}
    </Flex>
  )
}
