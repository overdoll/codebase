import { Input, InputProps } from '@chakra-ui/react'
import { useContext } from 'react'
import { FormInputContext } from '../../../FormInput'
import { useFormContext } from 'react-hook-form'

export default function TextInput ({
  ...rest
}: InputProps): JSX.Element {
  const {
    id
  } = useContext(FormInputContext)

  const { register } = useFormContext()

  return (
    <Input
      variant='filled'
      {...register(id)}
      {...rest}
    />
  )
}
