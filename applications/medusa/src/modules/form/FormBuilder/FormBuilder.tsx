import { ReactNode } from 'react'
import { FormProviderProps } from 'react-hook-form/dist/types/form'
import { FormProvider, useFormContext } from 'react-hook-form'
import { ButtonProps } from '@chakra-ui/react'
import Button from '../Button/Button'
import {
  CharacterValues
} from '../../../client/domain/Admin/pages/AdminCharacter/AdminCreateCharacter/AdminCreateCharacter/CreateCharacterForm/CreateCharacterForm'

interface ComponentProps extends FormProviderProps {
  children: ReactNode
  onSubmit: (value: any) => void
}

export const FormBuilder = ({
  children,
  onSubmit,
  ...formMethods
}: ComponentProps): JSX.Element => {
  const { handleSubmit } = formMethods

  return (
    <FormProvider {...formMethods}>
      <form noValidate onSubmit={handleSubmit(onSubmit)}>
        {children}
      </form>
    </FormProvider>
  )
}

export const FormBuilderSubmitButton = ({
  ...rest
}: ButtonProps): JSX.Element => {
  const {
    formState: {
      errors
    }
  } = useFormContext<CharacterValues>()

  const isDisabled = (): boolean => {
    Object.keys(errors).forEach((item) => {
      if (errors[item] != null) return true
    })
    return false
  }

  return (
    <Button
      type='submit'
      isDisabled={isDisabled()}
      {...rest}
    />
  )
}
