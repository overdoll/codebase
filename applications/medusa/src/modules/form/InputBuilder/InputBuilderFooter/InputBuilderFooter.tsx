import { FormErrorMessage } from '@chakra-ui/react'
import { useContext } from 'react'
import { determineTextSizing, InputBuilderContext } from '../InputBuilder'

interface Props {
  children?: JSX.Element | undefined
}

export default function InputBuilderFooter ({
  children
}: Props): JSX.Element {
  const {
    error,
    size = 'md'
  } = useContext(InputBuilderContext)

  if (error?.message == null) {
    return children != null ? children : <></>
  }

  return (
    <FormErrorMessage fontSize={determineTextSizing(size)}>
      {error.message}
    </FormErrorMessage>
  )
}
