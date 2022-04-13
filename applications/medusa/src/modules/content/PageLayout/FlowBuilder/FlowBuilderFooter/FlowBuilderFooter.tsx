import { Flex } from '@chakra-ui/react'
import { useContext } from 'react'
import { FlowContext } from '../FlowBuilder'
import FlowBuilderPreviousButton from './FlowBuilderPreviousButton/FlowBuilderPreviousButton'
import FlowBuilderNextButton from './FlowBuilderNextButton/FlowBuilderNextButton'
import { MaybeRenderProp } from '../../../../../types/components'
import runIfFunction from '../../../../support/runIfFunction'

interface ChildrenCallable {
  currentStep: string
  nextStep: () => void
  previousStep: () => void
  isAtStart: boolean
  isAtEnd: boolean
}

interface Props {
  children?: MaybeRenderProp<ChildrenCallable>
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
      {runIfFunction(children, {
        currentStep: currentStep,
        nextStep: nextStep,
        previousStep: previousStep,
        isAtStart: isAtStart,
        isAtEnd: isAtEnd
      })}
    </Flex>
  )
}
