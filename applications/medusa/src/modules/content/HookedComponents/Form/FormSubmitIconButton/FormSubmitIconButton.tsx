import { IconButtonProps } from '@chakra-ui/react'
import { useFormContext } from 'react-hook-form'
import IconButton from '../../../../form/IconButton/IconButton'

export default function FormSubmitIconButton ({
  ...rest
}: IconButtonProps): JSX.Element {
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
    <IconButton
      type='submit'
      isDisabled={isDisabled()}
      {...rest}
    />
  )
}
