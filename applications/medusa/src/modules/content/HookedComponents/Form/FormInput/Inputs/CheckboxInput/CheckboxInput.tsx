import { useContext } from 'react'
import { FormInputContext } from '../../FormInput'
import { Controller, useFormContext } from 'react-hook-form'
import { Checkbox, CheckboxProps } from '@chakra-ui/react'

type CheckboxInputProps = CheckboxProps

export default function CheckboxInput (props: CheckboxInputProps): JSX.Element {
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
          onChange,
          value
        },
        fieldState: {
          invalid
        }
      }) => (
        <Checkbox
          size={size}
          onChange={onChange}
          isChecked={value}
          isInvalid={invalid}
          {...props}
        />
      )}
    />
  )
}
