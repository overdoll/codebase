import { Stack } from '@chakra-ui/react'
import { createContext, FunctionComponent, ReactNode, useState } from 'react'
import { defineMessage } from '@lingui/macro'
import { useQueryParam } from 'use-query-params'
import { useUpdateEffect } from 'usehooks-ts'

interface BuilderProps {
  stepsArray: string[]
  stepsComponents: StepProps
  stepsHeaders?: HeaderProps
  colorScheme?: string
  defaultStep?: string
}

interface ComponentProps extends BuilderProps {
  children: ReactNode
  useParams?: boolean | undefined
  onFinish?: () => void
}

interface ContextProps extends BuilderProps {
  currentStep: string
  nextStep: () => void
  previousStep: () => void
  skipToStep: (step: string) => void
}

interface HeaderProps {
  [step: string]: {
    title: string
    icon: FunctionComponent<any>
  }
}

interface StepProps {
  [step: string]: ReactNode
}

const defaultValue = {
  stepsArray: [],
  stepsComponents: {},
  stepsHeaders: {},
  currentStep: '',
  colorScheme: 'primary',
  nextStep: () => {
  },
  previousStep: () => {
  },
  skipToStep: (step: string) => {
  }
}

export const FlowContext = createContext<ContextProps>(defaultValue)

export default function FlowBuilder ({
  stepsArray,
  defaultStep,
  children,
  stepsComponents,
  stepsHeaders,
  colorScheme = 'primary',
  onFinish,
  useParams
}: ComponentProps): JSX.Element {
  const initialStep = defaultStep != null ? defaultStep : stepsArray[0]

  const [paramStep, setParamStep] = useQueryParam<string | null | undefined>('step')
  const getParamStep = (paramStep != null && stepsArray.includes(paramStep)) ? paramStep : initialStep

  const [currentStep, setCurrentStep] = useState(useParams == null ? initialStep : getParamStep)

  const calculateCurrentStep = (step: string): void => {
    setCurrentStep(step)
    if (useParams === true) {
      setParamStep(step)
    }
  }

  const nextStep = (): void => {
    const currentIndex = stepsArray.indexOf(currentStep)

    if (currentIndex + 1 >= stepsArray.length) {
      calculateCurrentStep(stepsArray[0])
      onFinish?.()
      return
    }
    calculateCurrentStep(stepsArray[currentIndex + 1])
  }

  const previousStep = (): void => {
    const currentIndex = stepsArray.indexOf(currentStep)
    if (currentIndex - 1 < 0) {
      calculateCurrentStep(stepsArray[stepsArray.length - 1])
      return
    }
    calculateCurrentStep(stepsArray[currentIndex - 1])
  }

  const definedHeaders = stepsHeaders != null
    ? Object.keys(stepsHeaders).reduce((accum, item) => ({
      ...accum,
      [item]: {
        title: defineMessage({ message: stepsHeaders[item].title }),
        icon: stepsHeaders[item].icon
      }
    }), {})
    : {}

  const contextValue = {
    stepsArray: stepsArray,
    stepsComponents: stepsComponents,
    stepsHeaders: definedHeaders,
    currentStep: currentStep,
    nextStep: nextStep,
    previousStep: previousStep,
    skipToStep: setCurrentStep,
    colorScheme: colorScheme
  }

  useUpdateEffect(() => {
    if (useParams === true) {
      if (paramStep !== currentStep) {
        setCurrentStep(getParamStep)
      }
    }
  }, [paramStep, currentStep])

  return (
    <FlowContext.Provider value={contextValue}>
      <Stack spacing={4}>
        {children}
      </Stack>
    </FlowContext.Provider>
  )
}
