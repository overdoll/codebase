import { Stack } from '@chakra-ui/react'
import { createContext, FunctionComponent, ReactNode, useState } from 'react'
import { defineMessage } from '@lingui/macro'
import { useQueryParam } from 'use-query-params'
import { useUpdateEffect } from 'usehooks-ts'

interface BuilderProps {
  stepsArray: string[]
  stepsComponents: StepProps
  stepsHeaders: HeaderProps
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

  const [currentStep, setCurrentStep] = useState(initialStep)
  const [paramStep, setParamStep] = useQueryParam<string | null | undefined>('step')

  const nextStep = (): void => {
    const currentIndex = stepsArray.indexOf(currentStep)

    if (currentIndex + 1 >= stepsArray.length) {
      setCurrentStep(stepsArray[0])
      onFinish?.()
      return
    }
    setCurrentStep(stepsArray[currentIndex + 1])
  }

  const previousStep = (): void => {
    const currentIndex = stepsArray.indexOf(currentStep)
    if (currentIndex - 1 < 0) {
      setCurrentStep(stepsArray[stepsArray.length - 1])
      return
    }
    setCurrentStep(stepsArray[currentIndex - 1])
  }

  const definedHeaders = Object.keys(stepsHeaders).reduce((accum, item) => ({
    ...accum,
    [item]: {
      title: defineMessage({ message: stepsHeaders[item].title }),
      icon: stepsHeaders[item].icon
    }
  }), {})

  const contextValue = {
    stepsArray: stepsArray,
    stepsComponents: stepsComponents,
    stepsHeaders: definedHeaders,
    currentStep: useParams === true && paramStep != null ? paramStep : currentStep,
    nextStep: nextStep,
    previousStep: previousStep,
    skipToStep: setCurrentStep,
    colorScheme: colorScheme
  }

  useUpdateEffect(() => {
    if (useParams === true && currentStep !== initialStep) {
      setParamStep(currentStep)
    }
  }, [currentStep, setParamStep])

  useUpdateEffect(() => {
    if (useParams === true && paramStep == null) {
      setCurrentStep(initialStep)
    }
  }, [paramStep])

  return (
    <FlowContext.Provider value={contextValue}>
      <Stack spacing={4}>
        {children}
      </Stack>
    </FlowContext.Provider>
  )
}
