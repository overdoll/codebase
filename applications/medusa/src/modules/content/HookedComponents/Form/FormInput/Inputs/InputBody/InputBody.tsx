import { InputGroup, InputGroupProps } from '@chakra-ui/react'
import { useContext } from 'react'
import { FormInputContext } from '../../FormInput'

export default function InputBody ({
  children,
  ...rest
}: InputGroupProps): JSX.Element {
  const { size = 'md' } = useContext(FormInputContext)

  return (
    <InputGroup
      size={size}
      {...rest}
    >
      {children}
    </InputGroup>
  )
}
