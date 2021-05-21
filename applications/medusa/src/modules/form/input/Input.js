/**
 * @flow
 */
import type { Node } from 'react'
import { chakra, FormControl, FormHelperText, FormLabel, Input as ChakraInput } from '@chakra-ui/react'
import { useFormContext } from 'react-hook-form'
import Icon from '@//:modules/content/icon/Icon'
import AlertCircle from '@streamlinehq/streamlinehq/img/streamline-regular/alert-circle-eixfzl.svg'
import CheckDouble1 from '@streamlinehq/streamlinehq/img/streamline-regular/check-double-1-DeGZdc.svg'

type Props = {
  validation?: any,
  title: string,
  name: string,
  sx?: any,
};

export default function Input ({
  sx,
  validation,
  title,
  name,
  ...rest
}: Props): Node {
  const { register, errors, formState } = useFormContext() || {}

  const hasError = errors[name] !== null && errors[name] !== undefined
  const success = formState.isDirty && !hasError && formState.isSubmitted

  return (
    <FormControl isInvalid={hasError} id={name}>
      <chakra.div
        sx={{
          position: 'relative'
        }}
      >
        <FormLabel
          htmlFor={name}
          sx={{
            color: !success
              ? hasError
                ? 'orange.500'
                : 'gray.200'
              : 'green.600',
            fontFamily: 'heading',
            position: 'absolute',
            fontSize: 'm',
            pl: 3,
            pt: 2,
            transform: 'translateX(3.5%)'
          }}
        >
          {title}
        </FormLabel>
        <ChakraInput
          {...rest}
          id={name}
          variant='filled'
          name={name}
          ref={register(validation)}
          isInvalid={hasError}
          errorBorderColor='orange.300'
          focusBorderColor='gray.300'
          borderColor='gray.800'
          height='auto'
          pl={3}
          pr={7}
          pt={6}
          pb={1}
          radius='xl'
          fontSize='2xl'
        />

        {(hasError || success) && (
          <Icon
            icon={success ? CheckDouble1 : AlertCircle}
            color={success ? 'green.600' : 'orange.500'}
            sx={{
              top: '50%',
              transform: 'translateY(-50%)',
              position: 'absolute',
              display: 'inline-block',
              right: 2,
              bottom: 0,
              strokeWidth: 2
            }}
          />
        )}
      </chakra.div>
      <FormHelperText fontSize='lg' color='orange.300' pl={3} h={8}>
        {errors[name]?.message}
      </FormHelperText>
    </FormControl>
  )
}
