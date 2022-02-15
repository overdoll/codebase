import { FormControl } from '@chakra-ui/react'
import { createContext, ReactNode, useContext } from 'react'
import { ChangeHandler, UseFormRegisterReturn } from 'react-hook-form/dist/types/form'
import { FieldValue } from 'react-hook-form'
import { FormBuilderContext } from '../FormBuilder/FormBuilder'

interface InputBuilderProps {
  register?: UseFormRegisterReturn
  error?: FieldValue<any>
  size?: string
  isValid?: boolean
  isPending?: boolean
}

interface ComponentProps extends InputBuilderProps {
  children: ReactNode
  id?: string
}

type ContextProps = InputBuilderProps

const defaultValue = {
  register: {
    onChange: new Promise((resolve) => {
      resolve(false)
    }) as unknown as ChangeHandler,
    onBlur: new Promise((resolve) => {
      resolve(false)
    }) as unknown as ChangeHandler,
    name: '',
    ref: () => {
    }
  },
  error: {}
}

export const InputBuilderContext = createContext<ContextProps>(defaultValue)

export default function InputBuilder ({
  children,
  register,
  error,
  size,
  id,
  isValid,
  isPending
}: ComponentProps): JSX.Element {
  const {
    register: formBuilderRegister,
    errors: formBuilderErrors
  } = useContext(FormBuilderContext)

  const determineRegister = register == null && id != null ? formBuilderRegister(id) : register

  const determineError = error == null && id != null ? formBuilderErrors[id] : error

  const contextValue = {
    register: determineRegister,
    error: determineError,
    size: size,
    isValid: isValid,
    isPending: isPending
  }

  return (
    <InputBuilderContext.Provider value={contextValue}>
      <FormControl isInvalid={determineError != null}>
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
