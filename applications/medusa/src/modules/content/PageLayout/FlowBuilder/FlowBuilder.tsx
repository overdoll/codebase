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

  // TODO figure out param steps here

  const [paramStep, setParamStep] = useQueryParam<string | null | undefined>('step')
  const [currentStep, setCurrentStep] = useState(useParams == null ? initialStep : (paramStep == null ? initialStep : paramStep))

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
    currentStep: currentStep,
    nextStep: nextStep,
    previousStep: previousStep,
    skipToStep: setCurrentStep,
    colorScheme: colorScheme
  }

  useUpdateEffect(() => {
    if (useParams === true) {
      if (currentStep !== initialStep && currentStep !== paramStep) {
        setParamStep(currentStep)
      }
    }
  }, [currentStep, setParamStep, paramStep])

  useUpdateEffect(() => {
    if (useParams === true) {
      if (paramStep == null) {
        setCurrentStep(initialStep)
        return
      }
      setCurrentStep(paramStep)
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
