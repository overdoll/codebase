import { useContext } from 'react'
import { FlowBuilderFooter } from '../../FlowBuilder'
import { FlowContext } from '../FlowBuilder'
import { useLingui } from '@lingui/react'
import { HStack } from '@chakra-ui/react'
import Button from '../../../../form/Button/Button'
import { ArrowButtonLeft, ArrowButtonRight } from '@//:assets/icons'
import { Icon } from '../../index'

export default function FlowBuilderFloatingFooter (): JSX.Element {
  const {
    stepsHeaders,
    stepsArray,
    currentStep
  } = useContext(FlowContext)

  const { i18n } = useLingui()

  const currentIndex = stepsArray.indexOf(currentStep)

  const previousStep = stepsArray[currentIndex - 1] ?? currentStep

  const nextStep = stepsArray[currentIndex + 1] ?? currentStep

  const buttonProps = {
    size: 'sm',
    variant: 'ghost',
    colorScheme: 'primary',
    borderRadius: 'full'
  }

  return (
    <FlowBuilderFooter>
      {({
        isAtEnd,
        isAtStart,
        nextStep: goNextStep,
        previousStep: goPreviousStep
      }) => (
        <HStack w='100%' justify={isAtEnd ? 'flex-start' : isAtStart ? 'flex-end' : 'space-between'}>
          {!isAtStart && (
            <Button
              leftIcon={<Icon icon={ArrowButtonLeft} fill='inherit' w={2} h={2} />}
              onClick={goPreviousStep}
              {...buttonProps}
            >
              {i18n._(stepsHeaders[previousStep].title)}
            </Button>)}
          {!isAtEnd && (
            <Button
              rightIcon={<Icon icon={ArrowButtonRight} fill='inherit' w={2} h={2} />}
              onClick={goNextStep}
              {...buttonProps}
            >
              {i18n._(stepsHeaders[nextStep].title)}
            </Button>)}
        </HStack>
      )}
    </FlowBuilderFooter>
  )
}
