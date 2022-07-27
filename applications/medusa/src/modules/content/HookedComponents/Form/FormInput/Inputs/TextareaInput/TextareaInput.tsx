import { Textarea, TextareaProps } from '@chakra-ui/react'
import { forwardRef, useContext } from 'react'
import { FormInputContext } from '../../FormInput'
import { useFormContext } from 'react-hook-form'
import { mergeRefs } from 'use-callback-ref'

const TextareaInput = forwardRef<HTMLTextAreaElement, TextareaProps>(({
  ...rest
}: TextareaProps, forwardRef): JSX.Element => {
  const {
    id
  } = useContext(FormInputContext)

  const { register } = useFormContext()

  const {
    ref,
    ...restOfRegister
  } = register(id)

  return (
    <Textarea
      ref={mergeRefs([ref, forwardRef])}
      resize='none'
      {...rest}
      {...restOfRegister}
    />
  )
})

export default TextareaInput
