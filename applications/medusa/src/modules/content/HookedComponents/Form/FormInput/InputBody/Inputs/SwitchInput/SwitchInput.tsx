import { ReactNode, useContext } from 'react'
import { InputBuilderContext } from '../../../FormInput'
import { Controller, useFormContext } from 'react-hook-form'
import Switch from '../../../../../../../form/Switch/Switch'
import { Heading, HStack } from '@chakra-ui/react'

interface Props {
  placeholder: ReactNode
}

export default function SwitchInput ({ placeholder }: Props): JSX.Element {
  const {
    id,
    size
  } = useContext(InputBuilderContext)

  const {
    control
  } = useFormContext()

  return (
    <HStack spacing={3} align='center'>
      <Controller
        control={control}
        name={id}
        render={({
          field: {
            onChange,
            value,
            onBlur,
            name,
            ref
          },
          fieldState: {
            invalid
          }
        }) => (
          <Switch
            ref={ref}
            size={size}
            name={name}
            onChange={onChange}
            isInvalid={invalid}
            isChecked={value}
            onBlur={onBlur}
          />
        )}
      />
      <Heading fontSize={size} color='gray.00'>
        {placeholder}
      </Heading>
    </HStack>
  )
}
