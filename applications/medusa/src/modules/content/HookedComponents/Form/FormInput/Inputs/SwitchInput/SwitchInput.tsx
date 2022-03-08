import { useContext } from 'react'
import { FormInputContext } from '../../FormInput'
import { Controller, useFormContext } from 'react-hook-form'
import Switch from '../../../../../../form/Switch/Switch'
import { SwitchProps } from '@chakra-ui/react'

type Props = SwitchProps

export default function SwitchInput ({
  placeholder,
  ...rest
}: Props): JSX.Element {
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
          {...rest}
        />
      )}
    />
  )
}
