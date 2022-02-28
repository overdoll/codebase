import { ReactNode } from 'react'
import { FormProviderProps } from 'react-hook-form/dist/types/form'
import { FormProvider } from 'react-hook-form'

interface ComponentProps extends FormProviderProps<any> {
  children: ReactNode
  onSubmit: (value: any) => void
}

export default function Form ({
  children,
  onSubmit,
  ...formMethods
}: ComponentProps): JSX.Element {
  const { handleSubmit } = formMethods

  return (
    <FormProvider {...formMethods}>
      <form noValidate onSubmit={handleSubmit(onSubmit)}>
        {children}
      </form>
    </FormProvider>
  )
}
