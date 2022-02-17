import { Input, InputProps } from '@chakra-ui/react'
import { useContext } from 'react'
import { InputBuilderContext } from '../../../FormInput'
import { useFormContext } from 'react-hook-form'

export default function TextInput ({
  ...rest
}: InputProps): JSX.Element {
  const {
    id
  } = useContext(InputBuilderContext)

  const { register } = useFormContext()

  return (
    <Input
      variant='filled'
      {...register(id)}
      {...rest}
    />
  )
}
