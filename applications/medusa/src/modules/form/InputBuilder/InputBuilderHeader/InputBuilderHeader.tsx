import { FormLabel, FormLabelProps } from '@chakra-ui/react'
import { useContext } from 'react'
import { InputBuilderContext } from '../InputBuilder'

export default function InputBuilderHeader ({
  children,
  ...rest
}: FormLabelProps): JSX.Element {
  const {
    size = 'md',
    error
  } = useContext(InputBuilderContext)

  if (size === 'xl') {
    return (
      <FormLabel
        zIndex={1}
        htmlFor='code'
        variant='float'
        fontSize='sm'
        color={(error != null)
          ? 'orange.500'
          : 'gray.200'}
        {...rest}
      >
        {children}
      </FormLabel>
    )
  }

  return (
    <FormLabel
      fontSize={size}
      {...rest}
    >
      {children}
    </FormLabel>
  )
}
