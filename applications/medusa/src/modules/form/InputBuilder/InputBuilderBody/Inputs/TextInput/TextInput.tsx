import { Input, InputProps } from '@chakra-ui/react'
import { useContext } from 'react'
import { InputBuilderContext } from '../../../InputBuilder'

export default function TextInput ({
  ...rest
}: InputProps): JSX.Element {
  const {
    register
  } = useContext(InputBuilderContext)

  return (
    <Input
      variant='filled'
      {...register}
      {...rest}
    />
  )
}
