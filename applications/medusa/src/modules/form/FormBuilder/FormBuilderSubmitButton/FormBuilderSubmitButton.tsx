import { ButtonProps } from '@chakra-ui/react'
import { useContext } from 'react'
import { FormBuilderContext } from '../FormBuilder'
import Button from '../../Button/Button'

export default function FormBuilderSubmitButton ({
  ...rest
}: ButtonProps): JSX.Element {
  const { errors } = useContext(FormBuilderContext)

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
