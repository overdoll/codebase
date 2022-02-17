import { ButtonProps } from '@chakra-ui/react'
import { useFormContext } from 'react-hook-form'
import Button from '../../../../form/Button/Button'

export default function FormSubmitButton ({
  ...rest
}: ButtonProps): JSX.Element {
  const {
    formState: {
      errors
    }
  } = useFormContext()

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
