import { FormErrorMessage } from '@chakra-ui/react'
import { useContext } from 'react'
import { determineTextSizing, InputBuilderContext } from '../InputBuilder'
import { useFormContext } from 'react-hook-form'

interface Props {
  children?: JSX.Element | undefined
}

export default function InputBuilderFooter ({
  children
}: Props): JSX.Element {
  const {
    size = 'md',
    id
  } = useContext(InputBuilderContext)

  const { formState: { errors } } = useFormContext()

  const error = errors[id]

  if (error?.message == null) {
    return children != null ? children : <></>
  }

  return (
    <FormErrorMessage fontSize={determineTextSizing(size)}>
      {error.message}
    </FormErrorMessage>
  )
}
