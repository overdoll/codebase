import { FormControl } from '@chakra-ui/react'
import { createContext, ReactNode } from 'react'
import { useFormContext } from 'react-hook-form'

interface FormInputProps {
  id: string
  size?: string
  isPending?: boolean
}

interface ComponentProps extends FormInputProps {
  children: ReactNode
}

type ContextProps = FormInputProps

export const FormInputContext = createContext<ContextProps>({
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

  return (
    <FormInputContext.Provider value={contextValue}>
      <FormControl isInvalid={error != null}>
        {children}
      </FormControl>
    </FormInputContext.Provider>
  )
}

export const determineTextSizing = (size: string): string => {
  if (['xs', 'sm', 'md', 'lg'].includes(size)) {
    return 'sm'
  }
  return size
}
