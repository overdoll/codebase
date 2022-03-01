import { useContext } from 'react'
import { determineTextSizing, FormInputContext } from '../../FormInput'
import { FormHelperText, HelpTextProps } from '@chakra-ui/react'

export default function InputHelperText ({
  children,
  ...rest
}: HelpTextProps): JSX.Element {
  const {
    size = 'md'
  } = useContext(FormInputContext)

  return (
    <FormHelperText fontSize={determineTextSizing(size)} {...rest}>
      {children}
    </FormHelperText>
  )
}
