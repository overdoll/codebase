import { InputGroup, InputGroupProps } from '@chakra-ui/react'
import { useContext } from 'react'
import { InputBuilderContext } from '../FormInput'

export default function InputBody ({
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
