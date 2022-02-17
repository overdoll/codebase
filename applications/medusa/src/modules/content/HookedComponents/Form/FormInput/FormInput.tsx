import { FormControl } from '@chakra-ui/react'
import { createContext, ReactNode } from 'react'
import { useFormContext } from 'react-hook-form'

interface InputBuilderProps {
  id: string
  size?: string
  isPending?: boolean
}

interface ComponentProps extends InputBuilderProps {
  children: ReactNode
}

type ContextProps = InputBuilderProps

export const InputBuilderContext = createContext<ContextProps>({
  id: 'none',
  size: 'md',
  isPending: false
})

export default function FormInput ({
  children,
  size,
  id,
  isPending
}: ComponentProps): JSX.Element {
  const {
    formState: { errors }
  } = useFormContext()

  const contextValue = {
    size: size ?? 'md',
    isPending,
    id
  }

  const error = errors[id]

  // TODO get required state and pass it into FormControl

  return (
    <InputBuilderContext.Provider value={contextValue}>
      <FormControl isInvalid={error != null}>
        {children}
      </FormControl>
    </InputBuilderContext.Provider>
  )
}

export const determineTextSizing = (size: string): string => {
  if (['xs', 'sm', 'md', 'lg'].includes(size)) {
    return 'sm'
  }
  return size
}
