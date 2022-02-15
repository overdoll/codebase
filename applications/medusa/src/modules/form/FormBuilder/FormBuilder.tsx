import { createContext, ReactNode } from 'react'
import { ChangeHandler, FormState, UseFormRegister } from 'react-hook-form/dist/types/form'
import { FieldValue, FieldValues } from 'react-hook-form'

interface FormBuilderProps {
  register: UseFormRegister<FieldValue<any>>
  errors: FormState<FieldValues>['errors']
}

interface ComponentProps extends FormBuilderProps {
  children: ReactNode
  onSubmit: (value: any) => void
}

type ContextProps = FormBuilderProps

const defaultValue = {
  register: () => ({
    onChange: new Promise((resolve) => {
      resolve(false)
    }) as unknown as ChangeHandler,
    onBlur: new Promise((resolve) => {
      resolve(false)
    }) as unknown as ChangeHandler,
    name: '',
    ref: () => {
    }
  }),
  errors: {}
}

export const FormBuilderContext = createContext<ContextProps>(defaultValue)

export default function FormBuilder ({
  children,
  register,
  onSubmit,
  errors
}: ComponentProps): JSX.Element {
  const contextValue = {
    register: register,
    errors: errors
  }

  return (
    <FormBuilderContext.Provider value={contextValue}>
      <form noValidate onSubmit={onSubmit}>
        {children}
      </form>
    </FormBuilderContext.Provider>
  )
}
