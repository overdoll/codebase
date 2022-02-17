import { useContext } from 'react'
import { determineTextSizing, InputBuilderContext } from '../../FormInput'
import { FormHelperText, HelpTextProps } from '@chakra-ui/react'

export default function InputBuilderFooter ({
  children,
  ...rest
}: HelpTextProps): JSX.Element {
  const {
    size = 'md'
  } = useContext(InputBuilderContext)

  return (
    <FormHelperText fontSize={determineTextSizing(size)} {...rest}>
      {children}
    </FormHelperText>
  )
}
