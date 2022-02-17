import { useContext } from 'react'
import { FormInputContext } from '../../FormInput'
import { Controller, useFormContext } from 'react-hook-form'
import { Select, SelectProps } from '@chakra-ui/react'

type SelectInputProps = SelectProps

export default function SelectInput (props: SelectInputProps): JSX.Element {
  const {
    id,
    size
  } = useContext(FormInputContext)

  const {
    control
  } = useFormContext()

  return (
    <Controller
      control={control}
      name={id}
      render={({
        field: {
          onChange
        },
        fieldState: {
          invalid
        }
      }) => (
        <Select
          size={size}
          onChange={(e) => {
            onChange(e.target.value)
          }}
          isInvalid={invalid}
          {...props}
        />
      )}
    />
  )
}
