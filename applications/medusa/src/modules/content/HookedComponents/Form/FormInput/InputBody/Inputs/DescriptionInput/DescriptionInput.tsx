import { Textarea, TextareaProps } from '@chakra-ui/react'
import { useContext } from 'react'
import { InputBuilderContext } from '../../../FormInput'
import { useFormContext } from 'react-hook-form'

export default function DescriptionInput ({
  ...rest
}: TextareaProps): JSX.Element {
  const {
    id
  } = useContext(InputBuilderContext)

  const { register } = useFormContext()

  return (
    <Textarea
      resize='none'
      {...register(id)}
      {...rest}
    />
  )
}
