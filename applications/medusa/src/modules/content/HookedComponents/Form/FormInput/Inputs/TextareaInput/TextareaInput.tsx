import { Textarea, TextareaProps } from '@chakra-ui/react'
import { useContext } from 'react'
import { FormInputContext } from '../../FormInput'
import { useFormContext } from 'react-hook-form'

export default function TextareaInput ({
  ...rest
}: TextareaProps): JSX.Element {
  const {
    id
  } = useContext(FormInputContext)

  const { register } = useFormContext()

  return (
    <Textarea
      resize='none'
      {...register(id)}
      {...rest}
    />
  )
}
