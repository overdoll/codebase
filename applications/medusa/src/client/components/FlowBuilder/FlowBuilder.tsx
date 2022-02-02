import { Stack } from '@chakra-ui/react'
import { createContext, FunctionComponent, ReactNode, useState } from 'react'

interface BuilderProps {
  stepsArray: string[]
  stepsComponents: StepProps
  stepsHeaders: HeaderProps
  colorScheme?: string
  defaultStep?: string
}

interface ComponentProps extends BuilderProps {
  children: ReactNode
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
    title: ReactNode
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
  onFinish
}: ComponentProps): JSX.Element {
  const [currentStep, setCurrentStep] = useState(defaultStep != null ? defaultStep : stepsArray[0])

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

  const contextValue = {
    stepsArray: stepsArray,
    stepsComponents: stepsComponents,
    stepsHeaders: stepsHeaders,
    currentStep: currentStep,
    nextStep: nextStep,
    previousStep: previousStep,
    skipToStep: setCurrentStep,
    colorScheme: colorScheme
  }

  return (
    <FlowContext.Provider value={contextValue}>
      <Stack spacing={4}>
        {children}
      </Stack>
    </FlowContext.Provider>
  )
}
