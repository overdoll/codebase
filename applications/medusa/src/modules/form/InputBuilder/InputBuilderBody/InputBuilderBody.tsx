import { InputGroup, InputGroupProps } from '@chakra-ui/react'
import { useContext } from 'react'
import { InputBuilderContext } from '../InputBuilder'

export default function InputBuilderBody ({
  children,
  ...rest
}: InputGroupProps): JSX.Element {
  const { size = 'md' } = useContext(InputBuilderContext)

  return (
    <InputGroup
      size={size}
      {...rest}
    >
      {children}
    </InputGroup>
  )
}