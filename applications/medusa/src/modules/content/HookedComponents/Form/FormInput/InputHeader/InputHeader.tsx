import { FormLabel, FormLabelProps } from '@chakra-ui/react'
import { useContext } from 'react'
import { FormInputContext } from '../FormInput'
import { useFormContext } from 'react-hook-form'

export default function InputHeader ({
  children,
  ...rest
}: FormLabelProps): JSX.Element {
  const {
    size = 'md',
    id
  } = useContext(FormInputContext)

  const { formState: { errors } } = useFormContext()

  const error = errors[id]

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
